import './index.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { fetchSiteContent } from './lib/contentService';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VideoGrid from './components/VideoGrid';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

import {
  personalInfo,
  skills,
  videos,
  timelineEvents,
  testimonials,
  socialLinks
} from './data/siteData';

function App() {
  const { isDark, toggleTheme } = useTheme();

  const [siteContent, setSiteContent] = useState({
    personalInfo,
    skills,
    videos,
    timelineEvents,
    testimonials,
    socialLinks,
  });
  const [contentLoading, setContentLoading] = useState(true);

  // جلب المحتوى من Supabase عند بدء التطبيق — fetchSiteContent يقرأ كل الجداول
  useEffect(() => {
    fetchSiteContent().then((content) => {
      setSiteContent(content);
      setContentLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-offWhite dark:bg-darkBase font-sans transition-colors duration-300">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        {/* pt-16 offsets the fixed navbar height */}
        <main className="pt-16">
          <Routes>
            {/* Portfolio Routes (Single Landing Page) */}
            <Route
              path="/"
              element={
                contentLoading ? (
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-slate-400 animate-pulse">Loading...</p>
                  </div>
                ) : (
                  <>
                    <Hero personalInfo={siteContent.personalInfo} />
                    <About biography={siteContent.personalInfo.description} skills={siteContent.skills} />
                    <VideoGrid videos={siteContent.videos} socialLinks={siteContent.socialLinks} />
                    <Experience timelineEvents={siteContent.timelineEvents} />
                    <Testimonials testimonials={siteContent.testimonials} />
                    <Footer
                      socialLinks={siteContent.socialLinks}
                      whatsapp={siteContent.personalInfo.whatsapp}
                      email={siteContent.personalInfo.email}
                      languages={siteContent.personalInfo.languageOptions}
                    />
                  </>
                )
              }
            />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard siteContent={siteContent} setSiteContent={setSiteContent} />} />
          </Routes>
        </main>

        {/* Floating Developer Badge */}
        <div className="fixed bottom-4 left-4 z-[9999] group">
          <a
            href="https://github.com/abdomokhtardev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/90 dark:bg-darkCard/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-lightBorder/50 dark:border-darkBorder hover:scale-105 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-sans text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300">
              Developed by <span className="text-ceramicBlue dark:text-goldenYellow font-bold">abdomokhtardev</span>
            </span>
          </a>

          {/* Expanded contact links on hover */}
          <div className="absolute bottom-full left-0 mb-3 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white dark:bg-darkCard p-2 rounded-2xl shadow-xl border border-lightBorder/30 dark:border-darkBorder">
            <a href="https://github.com/abdomokhtardev" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-slate-700 dark:text-slate-200 transition-colors" title="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/abdomokhtardev" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-[#0a66c2] transition-colors" title="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://wa.me/201029060019" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-[#25D366] transition-colors" title="WhatsApp">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
