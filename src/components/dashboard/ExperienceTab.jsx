import React, { useState } from 'react';
import {
  addTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} from '../../lib/contentService';
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

const emptyEvent = () => ({
  year: '',
  role: '',
  club: '',
  description: '',
});

const ExperienceTab = ({ siteContent, setSiteContent }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyEvent());
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyEvent());
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setForm({
      year: event.year,
      role: event.role,
      club: event.club,
      description: event.description,
    });
    setMsg({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    let result;
    if (editingId) {
      // updateTimelineEvent — يُحدّث سجل خبرة في جدول timeline
      result = await updateTimelineEvent(editingId, form);
      if (result.ok) {
        setSiteContent((prev) => ({
          ...prev,
          timelineEvents: prev.timelineEvents.map((ev) =>
            ev.id === editingId ? result.data : ev
          ),
        }));
        setMsg({ type: 'success', text: 'تم تحديث الخبرة بنجاح' });
        resetForm();
      }
    } else {
      // addTimelineEvent — يُضيف سجلاً جديداً للجدول الزمني
      result = await addTimelineEvent({
        ...form,
        sort_order: siteContent.timelineEvents.length + 1,
      });
      if (result.ok) {
        setSiteContent((prev) => ({
          ...prev,
          timelineEvents: [...prev.timelineEvents, result.data],
        }));
        setMsg({ type: 'success', text: 'تمت إضافة الخبرة بنجاح' });
        resetForm();
      }
    }

    if (!result.ok) {
      setMsg({ type: 'error', text: result.error ?? 'حدث خطأ' });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الخبرة؟')) return;
    setLoading(true);

    const result = await deleteTimelineEvent(id);
    if (result.ok) {
      setSiteContent((prev) => ({
        ...prev,
        timelineEvents: prev.timelineEvents.filter((ev) => ev.id !== id),
      }));
      if (editingId === id) resetForm();
      setMsg({ type: 'success', text: 'تم حذف الخبرة' });
    } else {
      setMsg({ type: 'error', text: result.error ?? 'فشل الحذف' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <DashboardCard
        title={editingId ? 'تعديل خبرة' : 'إضافة خبرة جديدة'}
        subtitle="السنوات، الأدوار، والأندية في المسار المهني"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="السنة">
              <input
                className={inputClass}
                value={form.year}
                onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                placeholder="2024"
                required
                dir="ltr"
              />
            </FormField>
            <FormField label="النادي / المؤسسة">
              <input
                className={inputClass}
                value={form.club}
                onChange={(e) => setForm((p) => ({ ...p, club: e.target.value }))}
                required
              />
            </FormField>
          </div>

          <FormField label="الدور / المنصب">
            <input
              className={inputClass}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="الوصف">
            <textarea
              className={`${inputClass} min-h-[100px] resize-y`}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              required
            />
          </FormField>

          <div className="flex flex-wrap gap-3 pt-2">
            <PrimaryButton type="submit" loading={loading}>
              {editingId ? 'تحديث الخبرة' : 'إضافة الخبرة'}
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

      <DashboardCard
        title="سجل الخبرات"
        subtitle={`${siteContent.timelineEvents.length} خبرة`}
      >
        {siteContent.timelineEvents.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">لا توجد خبرات بعد.</p>
        ) : (
          <div className="space-y-3">
            {siteContent.timelineEvents.map((event) => (
              <div
                key={event.id}
                className={listItemClass}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-ceramicBlue dark:text-goldenYellow">
                        {event.year}
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {event.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {event.club}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <GhostButton type="button" onClick={() => startEdit(event)}>
                      تعديل
                    </GhostButton>
                    <DangerButton type="button" onClick={() => handleDelete(event.id)}>
                      حذف
                    </DangerButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default ExperienceTab;
