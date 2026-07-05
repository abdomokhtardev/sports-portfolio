-- إزالة قيد المنصات الثلاث — السماح بأي منصة
ALTER TABLE social_links DROP CONSTRAINT IF EXISTS social_links_platform_check;
