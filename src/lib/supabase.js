// ─────────────────────────────────────────────────────────────────────────────
//  supabase.js — Supabase client setup
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

// تعليق باللغة العربية: جلب متغيرات البيئة للاتصال بـ Supabase
// يتم استخدام import.meta.env في إطار عمل Vite للوصول إلى متغيرات البيئة مثل الرابط والمفتاح السري
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// تعليق باللغة العربية: إنشاء عميل (Client) الخاص بـ Supabase
// هذا العميل يتيح لنا التعامل مع قاعدة البيانات (إضافة، حذف، تعديل) واستخدام نظام المصادقة
export const supabase = createClient(supabaseUrl, supabaseKey);
