# دليل ربط Supabase بالموقع — خطوة بخطوة

هذا الدليل يشرح كيف تربط مشروع البرتفوليو بمشروع Supabase الخاص بك.

---

## 1. إنشاء مشروع Supabase

1. ادخل على [supabase.com/dashboard](https://supabase.com/dashboard)
2. اضغط **New Project**
3. اختر Organization → سمِّ المشروع → حدّد كلمة مرور لقاعدة البيانات → **Create**

---

## 2. جلب مفاتيح الاتصال (API Keys)

1. من الشريط الجانبي: **Project Settings** (⚙️)
2. **API** → انسخ:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

3. في مجلد المشروع، افتح ملف `.env` وضع:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc.......
```

4. أعد تشغيل السيرفر: `npm run dev`

> **ملاحظة:** المفتاح `anon` آمن للواجهة الأمامية — سياسات RLS تتحكم في من يقرأ/يكتب.

---

## 3. إنشاء الجداول (Database Tables)

1. من الشريط الجانبي: **SQL Editor**
2. **New query**
3. انسخ محتوى الملف `supabase/schema.sql` بالكامل
4. اضغط **Run**

### ماذا ينشئ هذا الملف؟

| الجدول | الغرض | يرتبط بـ |
|--------|-------|----------|
| `site_settings` | المعلومات العامة + صورة البرتفolio | تبويب "المعلومات العامة" |
| `videos` | روابط الفيديوهات | تبويب "الفيديوهات" |
| `timeline` | الخبرات المهنية | تبويب "الخبرة" |
| `social_links` | روابط YouTube/Facebook/LinkedIn | تبويب "المعلومات العامة" |
| Storage bucket `portfolio` | صور البرتفوليو المرفوعة | رفع الصورة في لوحة التحكم |

### إذا نفّذت schema.sql سابقاً

نفّذ أيضاً `supabase/migration_profile_image.sql` لإضافة حقل الصورة و Storage.

---

## 4. التحقق من الجداول

1. **Table Editor** من الشريط الجانبي
2. يجب أن ترى: `site_settings`, `videos`, `timeline`, `social_links`
3. `site_settings` فيه صف واحد فقط (`id = 1`)

---

## 5. إعداد Storage (صور البرتفوليو)

إذا نفّذت `schema.sql` الكامل، الـ bucket `portfolio` يُنشأ تلقائياً.

للتحقق:
1. **Storage** من الشريط الجانبي
2. يجب أن ترى bucket اسمه **portfolio** (Public ✅)

### رفع يدوي (اختياري)
- يمكنك رفع صورة من Storage → portfolio → profile/
- انسخ **Public URL** والصقه في لوحة التحكم → "رابط خارجي"

---

## 6. إنشاء مستخدم Admin (Authentication)

1. **Authentication** → **Users**
2. **Add user** → **Create new user**
3. أدخل Email + Password
4. هذا الحساب للدخول على `/login` ولوحة التحكم

> لا يوجد صفحة تسجيل في الموقع — المستخدمين يُنشَؤون من لوحة Supabase فقط.

---

## 7. Row Level Security (RLS) — كيف يعمل؟

السياسات في `schema.sql` تعني:

| العملية | من يستطيع؟ |
|---------|------------|
| قراءة المحتوى (SELECT) | **الجميع** — زوار الموقع |
| كتابة/تعديل/حذف | **المسجّل دخوله فقط** — Admin |

هذا يسمح للموقع بعرض المحتوى بدون تسجيل دخول، بينما لوحة التحكم محمية.

---

## 8. كيف يربط الموقع Supabase؟ (مسار البيانات)

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  supabase.js    │────▶│ contentService.js│────▶│  App.jsx        │
│  (عميل الاتصال) │     │ (قراءة/كتابة)    │     │ (حالة الموقع)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                         │                         │
         ▼                         ▼                         ▼
   .env (URL + Key)          الجداول + Storage          Hero, Footer,
                            videos, timeline...          VideoGrid...
```

### عند فتح الموقع (`/`)
- `App.jsx` يستدعي `fetchSiteContent()`
- تقرأ من: `site_settings`, `videos`, `timeline`, `social_links`
- إذا فشل الاتصال → تستخدم البيانات من `siteData.js`

### عند الحفظ من لوحة التحكم (`/dashboard`)
- **معلومات عامة** → `saveSiteSettings()` → `site_settings` + `social_links`
- **صورة** → `uploadProfileImage()` → Storage bucket `portfolio`
- **فيديو** → `addVideo()` / `updateVideo()` / `deleteVideo()` → `videos`
- **خبرة** → `addTimelineEvent()` ... → `timeline`
- **كلمة مرور** → `changePassword()` → Supabase Auth (ليس جدول)

---

## 9. ربط كل تبويب بجدوله

| تبويب لوحة التحكم | جدول Supabase | عمود الصورة |
|-------------------|---------------|-------------|
| المعلومات العامة | `site_settings` | `profile_image_url` |
| الفيديوهات | `videos` | — |
| الخبرة | `timeline` | — |
| كلمة المرور | Auth (Users) | — |

---

## 10. اختبار الربط

1. `npm run dev`
2. افتح `http://localhost:5173` — يجب أن يظهر المحتوى من Supabase
3. افتح `/login` — سجّل دخول بالحساب الذي أنشأته
4. `/dashboard` → عدّل معلومات → **حفظ**
5. ارجع للصفحة الرئيسية — التغييرات ظهرت ✅

### استكشاف الأخطاء

| المشكلة | الحل |
|---------|------|
| "relation does not exist" | نفّذ `schema.sql` في SQL Editor |
| فشل الحفظ / RLS | تأكد أنك مسجّل دخول في `/login` |
| فشل رفع الصورة | نفّذ migration أو تأكد من bucket `portfolio` |
| `.env` لا يعمل | أعد تشغيل `npm run dev` بعد تعديل `.env` |
| بيانات قديمة | امسح cache المتصفح أو Hard Refresh |

---

## 11. ملخص الملفات في المشروع

| الملف | الدور |
|-------|-------|
| `.env` | مفاتيح Supabase |
| `src/lib/supabase.js` | إنشاء عميل الاتصال |
| `src/lib/contentService.js` | كل عمليات CRUD + رفع الصور |
| `supabase/schema.sql` | إنشاء الجداول والسياسات |
| `supabase/migration_profile_image.sql` | تحديث لإضافة الصورة |

---

## 12. نشر الموقع (Production)

عند النشر على Vercel/Netlify:
1. أضف `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في Environment Variables
2. في Supabase → **Authentication** → **URL Configuration**:
   - **Site URL** = رابط موقعك المنشور
   - **Redirect URLs** = أضف `https://yourdomain.com/**`

---

**جاهز!** بعد تنفيذ هذه الخطوات، لوحة التحكم العربية متصلة بالكامل مع Supabase.
