-- ─────────────────────────────────────────────────────────────────────────────
--  مخطط قاعدة بيانات Supabase للبرتفوليو
--  نفّذ هذا الملف من لوحة Supabase → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- جدول المعلومات العامة (صف واحد فقط)
CREATE TABLE IF NOT EXISTS site_settings (
  id            INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name          TEXT NOT NULL DEFAULT '',
  title         TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  language_options TEXT[] NOT NULL DEFAULT '{}',
  whatsapp      TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL DEFAULT '',
  profile_image_url TEXT NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الفيديوهات
CREATE TABLE IF NOT EXISTS videos (
  id         BIGSERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  video_url  TEXT NOT NULL,
  duration   TEXT NOT NULL DEFAULT '',
  platform   TEXT NOT NULL DEFAULT 'youtube' CHECK (platform IN ('youtube', 'facebook')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول الخبرة / الجدول الزمني
CREATE TABLE IF NOT EXISTS timeline (
  id          BIGSERIAL PRIMARY KEY,
  year        TEXT NOT NULL,
  role        TEXT NOT NULL,
  club        TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- جدول روابط التواصل الاجتماعي
CREATE TABLE IF NOT EXISTS social_links (
  id         TEXT PRIMARY KEY,
  href       TEXT NOT NULL,
  label      TEXT NOT NULL,
  platform   TEXT NOT NULL DEFAULT 'link',
  sort_order INT NOT NULL DEFAULT 0
);

-- ── Row Level Security ──────────────────────────────────────────────────────

ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline       ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links   ENABLE ROW LEVEL SECURITY;

-- القراءة متاحة للجميع (الموقع العام)
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "public_read_videos"        ON videos        FOR SELECT USING (true);
CREATE POLICY "public_read_timeline"      ON timeline      FOR SELECT USING (true);
CREATE POLICY "public_read_social_links"  ON social_links  FOR SELECT USING (true);

-- الكتابة للمستخدمين المسجّلين فقط (لوحة التحكم)
CREATE POLICY "auth_write_site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_write_videos"        ON videos        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_write_timeline"      ON timeline      FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_write_social_links"  ON social_links  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ── Supabase Storage — bucket لصور البرتفوليو ───────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

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

-- ── بيانات أولية ────────────────────────────────────────────────────────────

INSERT INTO site_settings (id, name, title, description, language_options, whatsapp, email)
VALUES (
  1,
  'Coach Interpreter',
  'Professional Football Interpreter',
  'Bridging the gap between the manager and the pitch.',
  ARRAY['🇵🇹 Portuguese', '🇬🇧 English', '🇪🇸 Spanish'],
  '1234567890',
  'contact@example.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO videos (title, video_url, duration, platform, sort_order) VALUES
  ('Inside the Touchline: A Coach''s Voice', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '8:42',  'youtube', 1),
  ('The Art of Sports Interpretation',      'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '12:15', 'youtube', 2),
  ('Football Culture Across Languages',     'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '6:30',  'youtube', 3)
ON CONFLICT DO NOTHING;

INSERT INTO timeline (year, role, club, description, sort_order) VALUES
  ('2024', 'Lead Interpreter — Pre-Season Tour', 'European Club / Asia Tour', 'Provided full-time simultaneous and consecutive interpretation across training sessions, tactical meetings, and press conferences during a multi-city pre-season tour.', 1),
  ('2023', 'Sports Content Creator', 'Independent — YouTube & Social Media', 'Launched a Portuguese-language channel covering elite football coaching methodologies, interpretation behind the scenes, and cross-cultural sports culture with an engaged audience of thousands.', 2),
  ('2022', 'Media Liaison & Interpreter', 'Professional Football Club', 'Managed multilingual media relations for a first-division club, interpreting for the head coach in post-match press conferences and facilitating player communications with local and international journalists.', 3),
  ('2021', 'Training Ground Interpreter', 'Academy & First Team Setup', 'Embedded within the technical staff of a professional academy, translating real-time instructions from the coaching team to international players and providing cultural mediation.', 4),
  ('2019', 'Freelance Sports Interpreter', 'Various Clubs & Agencies', 'Began freelance interpreting career working with coaches and scouting agencies across Portugal, Spain, and the UK, rapidly building a reputation for accuracy, discretion, and deep football knowledge.', 5)
ON CONFLICT DO NOTHING;

INSERT INTO social_links (id, href, label, platform, sort_order) VALUES
  ('social-youtube',  'https://youtube.com',  'YouTube',  'youtube',  1),
  ('social-facebook', 'https://facebook.com', 'Facebook', 'facebook', 2),
  ('social-linkedin', 'https://linkedin.com', 'LinkedIn', 'linkedin', 3)
ON CONFLICT (id) DO NOTHING;
