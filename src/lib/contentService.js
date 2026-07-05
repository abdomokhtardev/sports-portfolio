// ─────────────────────────────────────────────────────────────────────────────
//  contentService.js — طبقة التعامل مع محتوى الموقع عبر Supabase
//  كل دالة تحتوي على تعليقات عربية لشرح آلية العمل
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from './supabase';
import {
  personalInfo,
  videos as defaultVideos,
  timelineEvents as defaultTimeline,
  socialLinks as defaultSocialLinks,
  skills,
  testimonials,
} from '../data/siteData';

/** @returns {Promise<{ ok: boolean, error?: string }>} */
function handleError(error, context) {
  if (error) {
    console.error(`[Supabase] ${context}:`, error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// ── جلب كل المحتوى للموقع ───────────────────────────────────────────────────

/**
 * جلب كل محتوى الموقع من Supabase
 * إذا فشل الاتصال أو الجداول فارغة، نرجع البيانات الافتراضية من siteData.js
 */
export async function fetchSiteContent() {
  try {
    // supabase.from('اسم_الجدول') — يحدد الجدول المراد قراءته
    // .select('*') — يجلب كل الأعمدة
    const [settingsRes, videosRes, timelineRes, socialRes] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('videos').select('*').order('sort_order', { ascending: true }),
      supabase.from('timeline').select('*').order('sort_order', { ascending: true }),
      supabase.from('social_links').select('*').order('sort_order', { ascending: true }),
    ]);

    const hasDbData =
      settingsRes.data ||
      (videosRes.data && videosRes.data.length > 0) ||
      (timelineRes.data && timelineRes.data.length > 0);

    if (!hasDbData) {
      return buildDefaultContent();
    }

    const settings = settingsRes.data;

    return {
      personalInfo: settings ? mapSettingsRow(settings) : { ...personalInfo },
      videos: (videosRes.data ?? []).map(mapVideoRow),
      timelineEvents: (timelineRes.data ?? []).map(mapTimelineRow),
      socialLinks: (socialRes.data ?? []).map(mapSocialRow),
      skills,
      testimonials,
    };
  } catch {
    return buildDefaultContent();
  }
}

function mapSettingsRow(row) {
  return {
    name: row.name,
    title: row.title,
    description: row.description,
    languageOptions: row.language_options ?? [],
    whatsapp: row.whatsapp ?? '',
    email: row.email ?? '',
    profileImageUrl: row.profile_image_url ?? '',
  };
}

function buildDefaultContent() {
  return {
    personalInfo: { ...personalInfo, whatsapp: '1234567890', email: 'contact@example.com' },
    videos: defaultVideos,
    timelineEvents: defaultTimeline,
    socialLinks: defaultSocialLinks,
    skills,
    testimonials,
  };
}

function mapVideoRow(row) {
  return {
    id: row.id,
    title: row.title,
    video_url: row.video_url,
    duration: row.duration,
    platform: row.platform,
  };
}

function mapTimelineRow(row) {
  return {
    id: row.id,
    year: row.year,
    role: row.role,
    club: row.club,
    description: row.description,
  };
}

function mapSocialRow(row) {
  return {
    id: row.id,
    href: row.href,
    label: row.label,
    platform: row.platform,
  };
}

// ── المعلومات العامة ────────────────────────────────────────────────────────

/**
 * حفظ المعلومات العامة في جدول site_settings
 * upsert — يُحدّث الصف إن وُجد أو يُنشئه إن لم يوجد (id=1 دائماً)
 */
export async function saveSiteSettings(personalInfoData, socialLinksData) {
  // keepExistingImage=true → نحافظ على الصورة المحفوظة إذا لم يُرسل رابط جديد
  let profileImageUrl = personalInfoData.profileImageUrl ?? '';
  if (personalInfoData.keepExistingImage) {
    const { data } = await supabase
      .from('site_settings')
      .select('profile_image_url')
      .eq('id', 1)
      .maybeSingle();
    profileImageUrl = data?.profile_image_url ?? '';
  }

  const { error: settingsError } = await supabase.from('site_settings').upsert(
    {
      id: 1,
      name: personalInfoData.name,
      title: personalInfoData.title,
      description: personalInfoData.description,
      language_options: personalInfoData.languageOptions,
      whatsapp: personalInfoData.whatsapp ?? '',
      email: personalInfoData.email ?? '',
      profile_image_url: profileImageUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  const settingsResult = handleError(settingsError, 'حفظ المعلومات العامة');
  if (!settingsResult.ok) return settingsResult;

  // حذف كل الروابط القديمة ثم إعادة إدراجها (استراتيجية بسيطة للمزامنة)
  await supabase.from('social_links').delete().gte('sort_order', 0);

  if (socialLinksData.length > 0) {
    const rows = socialLinksData.map((link, index) => ({
      id: link.id,
      href: link.href,
      label: link.label,
      platform: link.platform?.trim() || link.label.trim().toLowerCase().replace(/\s+/g, '-'),
      sort_order: index + 1,
    }));

    const { error: socialError } = await supabase.from('social_links').insert(rows);
    const socialResult = handleError(socialError, 'حفظ روابط التواصل');
    if (!socialResult.ok) return socialResult;
  }

  return { ok: true };
}

// ── صورة البرتفوليو (Storage) ────────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE_MB = 5;

/**
 * رفع صورة البرتفوليو إلى Supabase Storage
 *
 * آلية العمل:
 * 1. storage.from('portfolio') — يحدد الـ bucket (مجلد التخزين السحابي)
 * 2. .upload() — يرفع الملف ويُخزّنه في المسار profile/اسم-الملف
 * 3. .getPublicUrl() — يُرجع رابطاً عاماً يمكن عرضه في <img src="...">
 *
 * @param {File} file — ملف الصورة من input type="file"
 * @returns {{ ok: boolean, url?: string, error?: string }}
 */
export async function uploadProfileImage(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, error: 'الصيغ المسموحة: JPG, PNG, WebP' };
  }

  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return { ok: false, error: `الحد الأقصى لحجم الصورة ${MAX_IMAGE_SIZE_MB} ميجابايت` };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `profile/profile-${Date.now()}.${ext}`;

  // رفع الملف — upsert:true يستبدل الملف إذا وُجد بنفس الاسم
  const { error: uploadError } = await supabase.storage
    .from('portfolio')
    .upload(filePath, file, { upsert: true, cacheControl: '3600' });

  const uploadResult = handleError(uploadError, 'رفع صورة البرتفوليو');
  if (!uploadResult.ok) return uploadResult;

  // جلب الرابط العام — bucket عام (public) فيسمح للزوار برؤية الصورة
  const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
  return { ok: true, url: data.publicUrl };
}

// ── الفيديوهات ──────────────────────────────────────────────────────────────

/** إضافة فيديو جديد — insert يُدرج صفاً جديداً ويُرجع البيانات المُنشأة */
export async function addVideo(video) {
  const { data, error } = await supabase
    .from('videos')
    .insert({
      title: video.title,
      video_url: video.video_url,
      duration: video.duration,
      platform: video.platform,
      sort_order: video.sort_order ?? 0,
    })
    .select()
    .single();

  const result = handleError(error, 'إضافة فيديو');
  if (!result.ok) return result;
  return { ok: true, data: mapVideoRow(data) };
}

/** تحديث فيديو موجود — update مع eq('id') يحدّث الصف المطابق فقط */
export async function updateVideo(id, video) {
  const { data, error } = await supabase
    .from('videos')
    .update({
      title: video.title,
      video_url: video.video_url,
      duration: video.duration,
      platform: video.platform,
    })
    .eq('id', id)
    .select()
    .single();

  const result = handleError(error, 'تحديث فيديو');
  if (!result.ok) return result;
  return { ok: true, data: mapVideoRow(data) };
}

/** حذف فيديو — delete مع eq('id') يحذف الصف المحدد */
export async function deleteVideo(id) {
  const { error } = await supabase.from('videos').delete().eq('id', id);
  return handleError(error, 'حذف فيديو');
}

// ── الخبرة / الجدول الزمني ───────────────────────────────────────────────────

export async function addTimelineEvent(event) {
  const { data, error } = await supabase
    .from('timeline')
    .insert({
      year: event.year,
      role: event.role,
      club: event.club,
      description: event.description,
      sort_order: event.sort_order ?? 0,
    })
    .select()
    .single();

  const result = handleError(error, 'إضافة خبرة');
  if (!result.ok) return result;
  return { ok: true, data: mapTimelineRow(data) };
}

export async function updateTimelineEvent(id, event) {
  const { data, error } = await supabase
    .from('timeline')
    .update({
      year: event.year,
      role: event.role,
      club: event.club,
      description: event.description,
    })
    .eq('id', id)
    .select()
    .single();

  const result = handleError(error, 'تحديث خبرة');
  if (!result.ok) return result;
  return { ok: true, data: mapTimelineRow(data) };
}

export async function deleteTimelineEvent(id) {
  const { error } = await supabase.from('timeline').delete().eq('id', id);
  return handleError(error, 'حذف خبرة');
}

// ── تغيير كلمة المرور ───────────────────────────────────────────────────────

/**
 * تغيير كلمة المرور مع التحقق من كلمة المرور الحالية
 * 1. signInWithPassword — إعادة المصادقة للتأكد من كلمة المرور الحالية
 * 2. updateUser — تحديث كلمة المرور للجلسة النشطة
 */
export async function changePassword(email, currentPassword, newPassword) {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  if (signInError) {
    return { ok: false, error: 'كلمة المرور الحالية غير صحيحة' };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return handleError(updateError, 'تغيير كلمة المرور');
}
