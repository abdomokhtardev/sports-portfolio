import React, { useState } from 'react';
import { addVideo, updateVideo, deleteVideo } from '../../lib/contentService';
import {
  DashboardCard,
  FormField,
  inputClass,
  listItemClass,
  Alert,
  PrimaryButton,
  GhostButton,
  DangerButton,
} from './shared';

const emptyVideo = () => ({
  title: '',
  video_url: '',
  duration: '',
  platform: 'youtube',
});

const VideosTab = ({ siteContent, setSiteContent }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyVideo());
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyVideo());
  };

  const startEdit = (video) => {
    setEditingId(video.id);
    setForm({
      title: video.title,
      video_url: video.video_url,
      duration: video.duration,
      platform: video.platform,
    });
    setMsg({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    let result;
    if (editingId) {
      // updateVideo — يُحدّث صفاً موجوداً في جدول videos
      result = await updateVideo(editingId, form);
      if (result.ok) {
        setSiteContent((prev) => ({
          ...prev,
          videos: prev.videos.map((v) => (v.id === editingId ? result.data : v)),
        }));
        setMsg({ type: 'success', text: 'تم تحديث الفيديو بنجاح' });
        resetForm();
      }
    } else {
      // addVideo — يُدرج صفاً جديداً ويُرجع id من Supabase
      result = await addVideo({ ...form, sort_order: siteContent.videos.length + 1 });
      if (result.ok) {
        setSiteContent((prev) => ({
          ...prev,
          videos: [...prev.videos, result.data],
        }));
        setMsg({ type: 'success', text: 'تمت إضافة الفيديو بنجاح' });
        resetForm();
      }
    }

    if (!result.ok) {
      setMsg({ type: 'error', text: result.error ?? 'حدث خطأ' });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الفيديو؟')) return;
    setLoading(true);

    // deleteVideo — يحذف الصف من جدول videos باستخدام id
    const result = await deleteVideo(id);
    if (result.ok) {
      setSiteContent((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v.id !== id),
      }));
      if (editingId === id) resetForm();
      setMsg({ type: 'success', text: 'تم حذف الفيديو' });
    } else {
      setMsg({ type: 'error', text: result.error ?? 'فشل الحذف' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <DashboardCard
        title={editingId ? 'تعديل فيديو' : 'إضافة فيديو جديد'}
        subtitle="أدخل رابط YouTube أو Facebook"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="عنوان الفيديو">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="رابط الفيديو أو كود التضمين" hint="مثال: https://www.youtube.com/... أو <iframe src='...'>">
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              value={form.video_url}
              onChange={(e) => setForm((p) => ({ ...p, video_url: e.target.value }))}
              required
              dir="ltr"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="المدة">
              <input
                className={inputClass}
                value={form.duration}
                onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
                placeholder="8:42"
                dir="ltr"
              />
            </FormField>
            <FormField label="المنصة">
              <select
                className={inputClass}
                value={form.platform}
                onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value }))}
              >
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
              </select>
            </FormField>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <PrimaryButton type="submit" loading={loading}>
              {editingId ? 'تحديث الفيديو' : 'إضافة الفيديو'}
            </PrimaryButton>
            {editingId && (
              <GhostButton type="button" onClick={resetForm}>
                إلغاء التعديل
              </GhostButton>
            )}
          </div>
        </form>
      </DashboardCard>

      <Alert type={msg.type} message={msg.text} />

      <DashboardCard title="الفيديوهات الحالية" subtitle={`${siteContent.videos.length} فيديو`}>
        {siteContent.videos.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">لا توجد فيديوهات بعد.</p>
        ) : (
          <div className="space-y-3">
            {siteContent.videos.map((video) => (
              <div
                key={video.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${listItemClass}`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                    {video.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate" dir="ltr">
                    {video.video_url}
                  </p>
                  <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-ceramicBlue/10 text-ceramicBlue dark:bg-goldenYellow/15 dark:text-goldenYellow">
                    {video.platform} · {video.duration}
                  </span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <GhostButton type="button" onClick={() => startEdit(video)}>
                    تعديل
                  </GhostButton>
                  <DangerButton type="button" onClick={() => handleDelete(video.id)}>
                    حذف
                  </DangerButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default VideosTab;
