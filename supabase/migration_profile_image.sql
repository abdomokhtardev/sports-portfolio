-- ─────────────────────────────────────────────────────────────────────────────
--  تحديث: إضافة حقل صورة البرتفوليو + Storage
--  نفّذ هذا إذا كنت قد نفّذت schema.sql سابقاً
-- ─────────────────────────────────────────────────────────────────────────────

-- إضافة عمود رابط الصورة في جدول المعلومات العامة
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT '';

-- ── Supabase Storage — bucket لصور البرتفوليو ───────────────────────────────

-- إنشاء bucket عام (القراءة للجميع، الكتابة للمسجّلين فقط)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- سياسات Storage: من يرى ماذا؟
CREATE POLICY "public_read_portfolio_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

CREATE POLICY "auth_upload_portfolio_images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "auth_update_portfolio_images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "auth_delete_portfolio_images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
