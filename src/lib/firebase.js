// ─────────────────────────────────────────────────────────────────────────────
// firebase.js — إعدادات وتهيئة Firebase
//
// الخطوات لإنشاء مشروع Firebase وربطه هنا:
// 1. اذهب إلى https://console.firebase.google.com/
// 2. اضغط على "Add project" وأكمل الخطوات (لا تحتاج Google Analytics إذا أردت).
// 3. من لوحة التحكم (Project Overview)، اضغط على أيقونة الويب `</>` لإضافة تطبيق ويب.
// 4. سجل التطبيق باسم معين، ثم انسخ الـ firebaseConfig.
// 5. ضع القيم المستخرجة من firebaseConfig داخل ملف `.env` الخاص بك.
// 6. من القائمة الجانبية:
//    - Authentication: فعّل Email/Password من تبويب Sign-in method وقم بإنشاء مستخدم.
//    - Firestore Database: قم بإنشاء قاعدة بيانات (ابدأ في وضع Test Mode مبدئياً).
//    - Storage: قم بإنشاء مساحة تخزين للصور.
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// جلب متغيرات البيئة للاتصال بـ Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'placeholder-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'placeholder-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'placeholder-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'placeholder-app-id'
};

// تهيئة تطبيق Firebase
const app = initializeApp(firebaseConfig);

// استخراج الخدمات لاستخدامها في باقي المشروع
export const auth = getAuth(app);
export const db = getFirestore(app);
