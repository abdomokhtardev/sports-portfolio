import React from 'react';

/** بطاقة بتصميم هادئ متناسق مع البرتفوليو */
export const DashboardCard = ({ title, subtitle, children, className = '' }) => (
  <div className={`bg-white dark:bg-darkCard rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-lightBorder/40 dark:border-darkBorder animate-fade-in transition-all hover:shadow-[0_4px_32px_rgba(0,0,0,0.04)] ${className}`}>
    {title && (
      <div className="mb-8 pb-5 border-b border-lightBorder/30 dark:border-darkBorder flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-lightMuted dark:text-slate-400 font-medium">{subtitle}</p>
        )}
      </div>
    )}
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export const FormField = ({ label, children, hint }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 tracking-wide">{label}</label>
    {children}
    {hint && <p className="text-xs text-lightMuted dark:text-slate-500 font-medium">{hint}</p>}
  </div>
);

export const inputClass =
  'w-full px-4 py-3.5 rounded-2xl border-2 border-lightBorder/40 dark:border-darkBorder bg-slate-50/50 dark:bg-darkBase/50 text-slate-800 dark:text-white outline-none focus:border-ceramicBlue/40 dark:focus:border-goldenYellow/40 focus:bg-white dark:focus:bg-darkBase focus:ring-4 focus:ring-ceramicBlue/10 dark:focus:ring-goldenYellow/10 transition-all text-sm font-medium placeholder-slate-400';

export const listItemClass =
  'p-5 rounded-2xl bg-slate-50/80 dark:bg-darkBase/40 border-2 border-lightBorder/30 dark:border-darkBorder/80 hover:border-lightBorder/60 transition-colors';

export const tabBtnClass = (active) =>
  active
    ? 'bg-ceramicBlue text-white dark:bg-goldenYellow dark:text-darkBase shadow-md'
    : 'text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-white/5 dark:hover:bg-white/10';

export const Alert = ({ type, message }) => {
  if (!message) return null;
  const styles =
    type === 'error'
      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800/50'
      : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50';
  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${styles} font-medium text-sm animate-fade-in`}>
      {message}
    </div>
  );
};

export const PrimaryButton = ({ children, loading, className = '', ...props }) => (
  <button
    type="button"
    disabled={loading}
    className={`
      inline-flex items-center justify-center gap-2
      bg-ceramicBlue hover:bg-azulejoBlue dark:bg-goldenYellow dark:hover:bg-fatimaGold
      dark:text-darkBase text-white
      px-6 py-3.5 rounded-2xl font-bold text-sm
      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
      shadow-[0_4px_12px_rgba(0,51,153,0.2)] hover:shadow-[0_6px_20px_rgba(0,51,153,0.3)]
      dark:shadow-[0_4px_12px_rgba(244,180,26,0.2)] dark:hover:shadow-[0_6px_20px_rgba(244,180,26,0.3)]
      active:scale-[0.98]
      ${className}
    `}
    {...props}
  >
    {loading ? 'جاري الحفظ...' : children}
  </button>
);

export const GhostButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`
      inline-flex items-center justify-center gap-2
      text-slate-600 dark:text-slate-300
      hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white
      px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const DangerButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`
      inline-flex items-center justify-center gap-2
      bg-red-50 text-red-600 hover:bg-red-500 hover:text-white
      dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white
      px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

/** أزرار تبديل (رابط / رفع) */
export const ToggleButtons = ({ options, value, onChange }) => (
  <div className="flex gap-2 mb-4">
    {options.map(({ id, label }) => (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tabBtnClass(value === id)}`}
      >
        {label}
      </button>
    ))}
  </div>
);
