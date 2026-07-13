// ─────────────────────────────────────────────────────────────────────────────
//  contentService.js — طبقة التعامل مع محتوى الموقع عبر Firebase
//  كل دالة تحتوي على تعليقات عربية لشرح آلية العمل باستخدام Firebase
// ─────────────────────────────────────────────────────────────────────────────

import { db, storage, auth } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';

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
    console.error(`[Firebase] ${context}:`, error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// ── جلب كل المحتوى للموقع ───────────────────────────────────────────────────

/**
 * جلب كل محتوى الموقع من Firebase Firestore
 * إذا فشل الاتصال أو المجموعات (Collections) فارغة، نرجع البيانات الافتراضية
 */
export async function fetchSiteContent() {
  try {
    // جلب الإعدادات العامة للموقع
    const settingsRef = doc(db, 'site_settings', '1');
    const settingsSnap = await getDoc(settingsRef);

    // جلب الفيديوهات مع ترتيبها حسب sort_order
    const videosQuery = query(collection(db, 'videos'), orderBy('sort_order', 'asc'));
    const videosSnap = await getDocs(videosQuery);

    // جلب الجدول الزمني مع ترتيبه
    const timelineQuery = query(collection(db, 'timeline'), orderBy('sort_order', 'asc'));
    const timelineSnap = await getDocs(timelineQuery);

    // جلب روابط التواصل مع الترتيب
    const socialQuery = query(collection(db, 'social_links'), orderBy('sort_order', 'asc'));
    const socialSnap = await getDocs(socialQuery);

    const hasDbData =
      settingsSnap.exists() ||
      !videosSnap.empty ||
      !timelineSnap.empty;

    if (!hasDbData) {
      return buildDefaultContent();
    }

    const settings = settingsSnap.exists() ? settingsSnap.data() : null;

    return {
      personalInfo: settings ? mapSettingsRow(settings) : { ...personalInfo },
      videos: videosSnap.docs.map(doc => mapVideoRow(doc.id, doc.data())),
      timelineEvents: timelineSnap.docs.map(doc => mapTimelineRow(doc.id, doc.data())),
      socialLinks: socialSnap.docs.map(doc => mapSocialRow(doc.id, doc.data())),
      skills,
      testimonials,
    };
  } catch (error) {
    console.error("Fetch Site Content Error:", error);
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

function mapVideoRow(id, row) {
  return {
    id: id,
    title: row.title,
    video_url: row.video_url,
    duration: row.duration,
    platform: row.platform,
  };
}

function mapTimelineRow(id, row) {
  return {
    id: id,
    year: row.year,
    role: row.role,
    club: row.club,
    description: row.description,
  };
}

function mapSocialRow(id, row) {
  return {
    id: id,
    href: row.href,
    label: row.label,
    platform: row.platform,
  };
}

// ── المعلومات العامة ────────────────────────────────────────────────────────

/**
 * حفظ المعلومات العامة في Firestore
 * setDoc مع { merge: true } يُحدّث الحقول المطلوبة فقط أو يُنشئ المستند إن لم يوجد (بمعرّف = '1')
 */
export async function saveSiteSettings(personalInfoData, socialLinksData) {
  try {
    let profileImageUrl = personalInfoData.profileImageUrl ?? '';
    
    // إذا أردنا الحفاظ على الصورة القديمة
    if (personalInfoData.keepExistingImage) {
      const settingsSnap = await getDoc(doc(db, 'site_settings', '1'));
      if (settingsSnap.exists()) {
        profileImageUrl = settingsSnap.data().profile_image_url ?? '';
      }
    }

    // حفظ أو تحديث الإعدادات
    await setDoc(doc(db, 'site_settings', '1'), {
      name: personalInfoData.name,
      title: personalInfoData.title,
      description: personalInfoData.description,
      language_options: personalInfoData.languageOptions,
      whatsapp: personalInfoData.whatsapp ?? '',
      email: personalInfoData.email ?? '',
      profile_image_url: profileImageUrl,
      updated_at: new Date().toISOString(),
    }, { merge: true });

    // لحفظ الروابط، يمكننا حذفها بالكامل ثم إضافتها أو استخدام نهج أفضل
    // هنا سنقوم بجلبها وحذفها ثم إدخال الجديد
    const socialSnap = await getDocs(collection(db, 'social_links'));
    const deletePromises = socialSnap.docs.map(socialDoc => deleteDoc(doc(db, 'social_links', socialDoc.id)));
    await Promise.all(deletePromises);

    if (socialLinksData.length > 0) {
      const insertPromises = socialLinksData.map((link, index) => {
        // نستخدم addDoc لإنشاء معرّف عشوائي جديد
        return addDoc(collection(db, 'social_links'), {
          href: link.href,
          label: link.label,
          platform: link.platform?.trim() || link.label.trim().toLowerCase().replace(/\s+/g, '-'),
          sort_order: index + 1,
        });
      });
      await Promise.all(insertPromises);
    }

    return { ok: true };
  } catch (error) {
    return handleError(error, 'حفظ المعلومات العامة');
  }
}



// ── الفيديوهات ──────────────────────────────────────────────────────────────

/** إضافة فيديو جديد — addDoc يُدرج صفاً جديداً ويُرجع المستند المُنشأ مع id الخاص به */
export async function addVideo(video) {
  try {
    const newVideo = {
      title: video.title,
      video_url: video.video_url,
      duration: video.duration,
      platform: video.platform,
      sort_order: video.sort_order ?? 0,
    };
    const docRef = await addDoc(collection(db, 'videos'), newVideo);
    return { ok: true, data: mapVideoRow(docRef.id, newVideo) };
  } catch (error) {
    return handleError(error, 'إضافة فيديو');
  }
}

/** تحديث فيديو موجود — updateDoc يُحدّث الحقول المطلوبة بناءً على id المستند */
export async function updateVideo(id, video) {
  try {
    const videoRef = doc(db, 'videos', id);
    const updatedData = {
      title: video.title,
      video_url: video.video_url,
      duration: video.duration,
      platform: video.platform,
    };
    await updateDoc(videoRef, updatedData);
    return { ok: true, data: mapVideoRow(id, updatedData) };
  } catch (error) {
    return handleError(error, 'تحديث فيديو');
  }
}

/** حذف فيديو — deleteDoc يحذف المستند المحدد عبر معرفه (id) */
export async function deleteVideo(id) {
  try {
    await deleteDoc(doc(db, 'videos', id));
    return { ok: true };
  } catch (error) {
    return handleError(error, 'حذف فيديو');
  }
}

// ── الخبرة / الجدول الزمني ───────────────────────────────────────────────────

export async function addTimelineEvent(event) {
  try {
    const newEvent = {
      year: event.year,
      role: event.role,
      club: event.club,
      description: event.description,
      sort_order: event.sort_order ?? 0,
    };
    const docRef = await addDoc(collection(db, 'timeline'), newEvent);
    return { ok: true, data: mapTimelineRow(docRef.id, newEvent) };
  } catch (error) {
    return handleError(error, 'إضافة خبرة');
  }
}

export async function updateTimelineEvent(id, event) {
  try {
    const eventRef = doc(db, 'timeline', id);
    const updatedData = {
      year: event.year,
      role: event.role,
      club: event.club,
      description: event.description,
    };
    await updateDoc(eventRef, updatedData);
    return { ok: true, data: mapTimelineRow(id, updatedData) };
  } catch (error) {
    return handleError(error, 'تحديث خبرة');
  }
}

export async function deleteTimelineEvent(id) {
  try {
    await deleteDoc(doc(db, 'timeline', id));
    return { ok: true };
  } catch (error) {
    return handleError(error, 'حذف خبرة');
  }
}

// ── تغيير كلمة المرور ───────────────────────────────────────────────────────

/**
 * تغيير كلمة المرور عبر Firebase Auth
 * 1. signInWithEmailAndPassword — للتحقق من كلمة المرور الحالية (Re-authenticate)
 * 2. updatePassword — تحديث كلمة المرور للحساب الحالي
 */
export async function changePassword(email, currentPassword, newPassword) {
  try {
    // التأكد من الحساب القديم أولاً (يستدعي إعادة تسجيل الدخول لتحديث الجلسة)
    const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
    
    // تغيير الباسورد للمستخدم الحالي
    await updatePassword(userCredential.user, newPassword);
    
    return { ok: true };
  } catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      return { ok: false, error: 'كلمة المرور الحالية غير صحيحة' };
    }
    return handleError(error, 'تغيير كلمة المرور');
  }
}
