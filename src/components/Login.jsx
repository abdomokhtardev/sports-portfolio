import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // signInWithPassword — يرسل البيانات لـ Supabase Auth ويُنشئ جلسة عند النجاح
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg('البريد أو كلمة المرور غير صحيحة');
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div dir="rtl" className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-offWhite dark:bg-darkBase">
      <div className="glazed-tile rounded-2xl p-8 w-full max-w-md animate-scale-in">
        <h1 className="text-3xl font-serif text-ceramicBlue dark:text-goldenYellow mb-2 text-center font-bold">
          تسجيل الدخول
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 text-center text-sm">
          أدخل بياناتك للوصول إلى لوحة التحكم
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-lightBorder dark:border-darkBorder bg-lightSurface/50 dark:bg-darkBase text-lightInk dark:text-white focus:outline-none focus:ring-2 focus:ring-ceramicBlue/35"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-lightBorder dark:border-darkBorder bg-lightSurface/50 dark:bg-darkBase text-lightInk dark:text-white focus:outline-none focus:ring-2 focus:ring-ceramicBlue/35 pr-11"
              />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-ceramicBlue dark:hover:text-goldenYellow transition-colors">
                {showPw
                  ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ceramicBlue hover:bg-azulejoBlue dark:bg-goldenYellow dark:hover:bg-fatimaGold dark:text-darkBase text-white py-3 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50 mt-2"
          >
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
