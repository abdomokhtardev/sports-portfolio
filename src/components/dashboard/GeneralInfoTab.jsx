import React, { useState, useRef } from 'react';
import { saveSiteSettings } from '../../lib/contentService';
import { compressImageToBase64 } from '../../lib/imageUtils';
import {
  DashboardCard,
  FormField,
  inputClass,
  listItemClass,
  Alert,
  PrimaryButton,
  GhostButton,
} from './shared';

const emptyLink = () => ({
  id: `social-${Date.now()}`,
  href: '',
  label: '',
  platform: '',
});

const GeneralInfoTab = ({ siteContent, setSiteContent }) => {
  const savedImage = siteContent.personalInfo.profileImageUrl ?? '';

  const [form, setForm] = useState({
    name: siteContent.personalInfo.name ?? '',
    title: siteContent.personalInfo.title ?? '',
    description: siteContent.personalInfo.description ?? '',
    languageOptions: (siteContent.personalInfo.languageOptions ?? []).join('\n'),
    whatsapp: siteContent.personalInfo.whatsapp ?? '',
    email: siteContent.personalInfo.email ?? '',
    profileImageUrl: savedImage,
  });
  
  const [imageMode, setImageMode] = useState('upload'); // 'link' or 'upload'
  const [imageRemoved, setImageRemoved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [socialLinks, setSocialLinks] = useState(
    siteContent.socialLinks?.length ? [...siteContent.socialLinks] : [emptyLink()]
  );
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const updateLink = (index, field, value) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    );
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type and size
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMsg({ type: 'error', text: 'الصيغ المسموحة: JPG, PNG, WebP' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ type: 'error', text: 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت' });
      return;
    }

    setUploading(true);
    setMsg({ type: '', text: '' });

    try {
      // Compress to Base64 (max 800px width/height, 0.7 quality)
      const base64Url = await compressImageToBase64(file, 800, 800, 0.7);
      updateField('profileImageUrl', base64Url);
      setImageRemoved(false);
      setMsg({ type: 'success', text: 'تم ضغط ومعالجة الصورة بنجاح! اضغط "حفظ" لتثبيتها.' });
    } catch (error) {
      setMsg({ type: 'error', text: 'حدث خطأ أثناء معالجة الصورة.' });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    const trimmedImage = form.profileImageUrl.trim();
    const profileImageUrl = imageRemoved ? '' : (trimmedImage || savedImage);

    // Limit base64 length in normal context, but Firestore supports 1MB per document
    // Our compressed base64 should be ~50-200KB, which is perfectly safe.

    const personalInfoData = {
      name: form.name.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      languageOptions: form.languageOptions
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim(),
      profileImageUrl: imageRemoved ? '' : trimmedImage,
      keepExistingImage: !trimmedImage && !imageRemoved,
    };

    const validLinks = socialLinks.filter((l) => l.href.trim() && l.label.trim());

    const result = await saveSiteSettings(personalInfoData, validLinks);

    if (result.ok) {
      setSiteContent((prev) => ({
        ...prev,
        personalInfo: { ...personalInfoData, profileImageUrl },
        socialLinks: validLinks,
      }));
      setForm((prev) => ({ ...prev, profileImageUrl }));
      setImageRemoved(false);
      setMsg({ type: 'success', text: 'تم حفظ المعلومات العامة بنجاح' });
    } else {
      setMsg({ type: 'error', text: result.error ?? 'حدث خطأ أثناء الحفظ' });
    }
    setLoading(false);
  };

  const previewImage = imageRemoved ? '' : (form.profileImageUrl || savedImage);

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <DashboardCard title="المعلومات العامة" subtitle="الاسم، المسمى الوظيفي، الوصف، ولغات التواصل">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="الاسم الكامل">
            <input className={inputClass} value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
          </FormField>
          <FormField label="المسمى الوظيفي">
            <input className={inputClass} value={form.title} onChange={(e) => updateField('title', e.target.value)} required />
          </FormField>
        </div>

        <div className="mt-5">
          <FormField label="نبذة مختصرة" hint="تظهر في قسم البطل (Hero) والتعريف">
            <textarea className={`${inputClass} min-h-[100px] resize-y`} value={form.description} onChange={(e) => updateField('description', e.target.value)} required />
          </FormField>
        </div>

        <div className="mt-5">
          <FormField label="اللغات" hint="سطر واحد لكل لغة">
            <textarea className={`${inputClass} min-h-[80px] resize-y`} value={form.languageOptions} onChange={(e) => updateField('languageOptions', e.target.value)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <FormField label="رقم WhatsApp" hint="بدون + أو مسافات">
            <input className={inputClass} value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} dir="ltr" />
          </FormField>
          <FormField label="البريد الإلكتروني">
            <input type="email" className={inputClass} value={form.email} onChange={(e) => updateField('email', e.target.value)} dir="ltr" />
          </FormField>
        </div>
      </DashboardCard>

      <DashboardCard title="صورة البرتفوليو" subtitle="تظهر في قسم البطل — يمكنك رفع صورة أو وضع رابط خارجي">
        {previewImage && (
          <div className="mb-5 flex justify-center">
            <div className="relative w-40 h-48 rounded-2xl overflow-hidden border-2 border-ceramicBlue/25 dark:border-goldenYellow/20 shadow-md">
              <img src={previewImage} alt="معاينة" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Toggle Mode */}
        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={() => setImageMode('upload')}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${imageMode === 'upload' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            رفع صورة (مباشر)
          </button>
          <button
            type="button"
            onClick={() => setImageMode('link')}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${imageMode === 'link' ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            رابط خارجي
          </button>
        </div>

        {imageMode === 'link' ? (
          <FormField label="رابط الصورة" hint="اتركه فارغاً للاحتفاظ بالصورة الحالية (استخدم موقع مثل Imgur أو ضع مسار صورة محلية)">
            <input
              className={inputClass}
              value={form.profileImageUrl}
              onChange={(e) => updateField('profileImageUrl', e.target.value)}
              placeholder={savedImage || 'https://...'}
              dir="ltr"
            />
          </FormField>
        ) : (
          <FormField label="اختر صورة" hint="سيتم تحويلها لبيانات نصية صغيرة (Base64) وحفظها فوراً">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-lightMuted dark:text-slate-400
                file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0
                file:bg-ceramicBlue/12 file:text-ceramicBlue dark:file:bg-goldenYellow/15 dark:file:text-goldenYellow
                file:font-medium file:cursor-pointer"
            />
            {uploading && <p className="text-sm text-lightMuted animate-pulse mt-2">جاري معالجة الصورة...</p>}
          </FormField>
        )}

        {previewImage && (
          <GhostButton type="button" onClick={() => { setImageRemoved(true); updateField('profileImageUrl', ''); }} className="text-red-500 mt-3">
            إزالة الصورة
          </GhostButton>
        )}
      </DashboardCard>

      <DashboardCard title="روابط التواصل" subtitle="أي منصة — YouTube, Instagram, TikTok, GitHub...">
        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div key={link.id} className={`${listItemClass} space-y-3`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormField label="المنصة" hint="مثال: instagram, tiktok">
                  <input
                    className={inputClass}
                    value={link.platform}
                    onChange={(e) => updateLink(index, 'platform', e.target.value)}
                    placeholder="instagram"
                    dir="ltr"
                  />
                </FormField>
                <FormField label="التسمية">
                  <input className={inputClass} value={link.label} onChange={(e) => updateLink(index, 'label', e.target.value)} placeholder="Instagram" />
                </FormField>
                <FormField label="الرابط">
                  <input className={inputClass} value={link.href} onChange={(e) => updateLink(index, 'href', e.target.value)} placeholder="https://..." dir="ltr" />
                </FormField>
              </div>
              <GhostButton type="button" onClick={() => setSocialLinks((prev) => prev.filter((_, i) => i !== index))} className="text-red-500">
                حذف الرابط
              </GhostButton>
            </div>
          ))}
          <GhostButton type="button" onClick={() => setSocialLinks((prev) => [...prev, emptyLink()])}>
            + إضافة رابط جديد
          </GhostButton>
        </div>
      </DashboardCard>

      <Alert type={msg.type} message={msg.text} />
      <PrimaryButton type="submit" loading={loading}>حفظ التغييرات</PrimaryButton>
    </form>
  );
};

export default GeneralInfoTab;
