import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AzulejoPattern from './ui/AzulejoPattern';
import GeneralInfoTab from './dashboard/GeneralInfoTab';
import VideosTab from './dashboard/VideosTab';
import ExperienceTab from './dashboard/ExperienceTab';
import PasswordTab from './dashboard/PasswordTab';

// تعريف التبويبات بالعربية
const TABS = [
  { id: 'general', label: 'المعلومات العامة', icon: '◈' },
  { id: 'videos', label: 'الفيديوهات', icon: '▶' },
  { id: 'experience', label: 'الخبرة', icon: '◷' },
  { id: 'password', label: 'كلمة المرور', icon: '◉' },
];

const Dashboard = ({ siteContent, setSiteContent }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // التحقق من الجلسة — getSession يقرأ التوكن المخزّن محلياً
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
      setAuthLoading(false);
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    // signOut — يُنهي الجلسة ويمسح التوكن من التخزين المحلي
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div dir="rtl" className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-offWhite dark:bg-darkBase">
        <p className="text-slate-500 dark:text-slate-400 animate-pulse">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex bg-[#F8FAFD] dark:bg-darkBase font-arabic relative overflow-hidden text-lightInk dark:text-slate-200">
      
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-40
          w-72 bg-white dark:bg-darkCard
          border-l border-lightBorder/50 dark:border-darkBorder
          flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.03)] dark:shadow-none
          transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo / Header */}
        <div className="h-20 flex items-center px-8 border-b border-lightBorder/30 dark:border-darkBorder relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 dark:opacity-5 pointer-events-none">
            <AzulejoPattern opacity={0.5} />
          </div>
          <div className="relative flex flex-col">
            <h2 className="text-2xl font-bold text-ceramicBlue dark:text-goldenYellow tracking-tight">
              لوحة التحكم
            </h2>
            <p className="text-[11px] text-lightMuted dark:text-slate-500 font-medium tracking-wide uppercase mt-0.5">
              إدارة المحتوى
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300
                  group relative overflow-hidden
                  ${
                    isActive
                      ? 'text-ceramicBlue dark:text-goldenYellow bg-ceramicBlue/[0.04] dark:bg-goldenYellow/[0.08]'
                      : 'text-lightMuted dark:text-slate-400 hover:bg-lightSurface/50 dark:hover:bg-white/5 hover:text-lightInk dark:hover:text-slate-300'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-ceramicBlue dark:bg-goldenYellow rounded-l-full" />
                )}
                <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {tab.icon}
                </span>
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-lightBorder/30 dark:border-darkBorder space-y-2 bg-slate-50/50 dark:bg-transparent">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-lightMuted dark:text-slate-400 hover:text-ceramicBlue dark:hover:text-goldenYellow hover:bg-white dark:hover:bg-white/5 rounded-xl transition-all shadow-sm border border-transparent hover:border-lightBorder/30 dark:hover:border-transparent"
          >
            العودة للموقع
            <span className="rotate-180">➜</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-semibold text-sm transition-all"
          >
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content Area ── */}
      <main className="flex-1 md:pr-72 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white/80 dark:bg-darkCard/80 backdrop-blur-xl border-b border-lightBorder/30 dark:border-darkBorder sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-lightSurface/50 dark:bg-white/5 text-lightInk dark:text-slate-300 hover:bg-lightSurface dark:hover:bg-white/10 transition-colors"
            >
              ☰
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-lightMuted dark:text-slate-400 mt-1 font-medium">
                تحديث وعرض البيانات الخاصة بهذا القسم
              </p>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-24 relative">
           <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            {activeTab === 'general' && (
              <GeneralInfoTab siteContent={siteContent} setSiteContent={setSiteContent} />
            )}
            {activeTab === 'videos' && (
              <VideosTab siteContent={siteContent} setSiteContent={setSiteContent} />
            )}
            {activeTab === 'experience' && (
              <ExperienceTab siteContent={siteContent} setSiteContent={setSiteContent} />
            )}
            {activeTab === 'password' && <PasswordTab />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
