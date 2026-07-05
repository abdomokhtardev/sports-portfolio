import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { changePassword } from '../../lib/contentService';
import { DashboardCard, FormField, inputClass, Alert, PrimaryButton } from './shared';

const PasswordTab = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // جلب بريد المستخدم الحالي من الجلسة النشطة
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) setEmail(session.user.email);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'كلمة المرور الجديدة غير متطابقة' });
      return;
    }

    if (!currentPassword) {
      setMsg({ type: 'error', text: 'يرجى إدخال كلمة المرور الحالية' });
      return;
    }

    setLoading(true);

    // changePassword — يتحقق من كلمة المرور الحالية ثم يُحدّثها عبر Supabase Auth
    const result = await changePassword(email, currentPassword, newPassword);

    if (result.ok) {
      setMsg({ type: 'success', text: 'تم تغيير كلمة المرور بنجاح' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMsg({ type: 'error', text: result.error ?? 'فشل تغيير كلمة المرور' });
    }
    setLoading(false);
  };

  const EyeBtn = ({ show, onToggle }) => (
    <button type="button" onClick={onToggle} className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-ceramicBlue dark:hover:text-goldenYellow transition-colors">
      {show
        ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
        : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      }
    </button>
  );

  return (
    <DashboardCard
      title="تغيير كلمة المرور"
      subtitle="لأمان حسابك، أدخل كلمة المرور الحالية قبل التغيير"
    >
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {email && (
          <FormField label="البريد الإلكتروني">
            <input className={`${inputClass} opacity-60 cursor-not-allowed`} value={email} readOnly dir="ltr" />
          </FormField>
        )}

        <FormField label="كلمة المرور الحالية">
          <div className="relative">
            <input type={showCurrent ? 'text' : 'password'} className={inputClass} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required autoComplete="current-password" />
            <EyeBtn show={showCurrent} onToggle={() => setShowCurrent(v => !v)} />
          </div>
        </FormField>

        <FormField label="كلمة المرور الجديدة">
          <div className="relative">
            <input type={showNew ? 'text' : 'password'} className={inputClass} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} autoComplete="new-password" />
            <EyeBtn show={showNew} onToggle={() => setShowNew(v => !v)} />
          </div>
        </FormField>

        <FormField label="تأكيد كلمة المرور الجديدة">
          <div className="relative">
            <input type={showConfirm ? 'text' : 'password'} className={inputClass} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />
            <EyeBtn show={showConfirm} onToggle={() => setShowConfirm(v => !v)} />
          </div>
        </FormField>

        <Alert type={msg.type} message={msg.text} />

        <PrimaryButton type="submit" loading={loading}>
          حفظ كلمة المرور
        </PrimaryButton>
      </form>
    </DashboardCard>
  );
};

export default PasswordTab;
