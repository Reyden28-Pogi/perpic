-- ============================================================
-- PerPic Portfolio - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Portfolio Items
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text DEFAULT 'Photography',
  image_url text,
  tags text[],
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  issuer text,
  date text,
  image_url text,
  credential_url text,
  created_at timestamptz DEFAULT now()
);

-- 3. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 5. Public read access for portfolio and certificates
CREATE POLICY "Public can read portfolio_items"
  ON portfolio_items FOR SELECT USING (true);

CREATE POLICY "Public can read certificates"
  ON certificates FOR SELECT USING (true);

-- 6. Anyone can submit contact messages
CREATE POLICY "Anyone can insert contact_messages"
  ON contact_messages FOR INSERT WITH CHECK (true);

-- 7. Only authenticated users (admin) can manage everything
CREATE POLICY "Authenticated can manage portfolio_items"
  ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage certificates"
  ON certificates FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can read and manage contact_messages"
  ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE SETUP (do this in Supabase Dashboard → Storage)
-- ============================================================
-- 1. Go to Storage → Create bucket
-- 2. Name it: portfolio-assets
-- 3. Check "Public bucket"
-- 4. Click Create
-- ============================================================
-- After setup, insert sample data (optional):
-- ============================================================

-- INSERT INTO portfolio_items (title, category, description, tags, featured) VALUES
--   ('Portrait Photography', 'Photography', 'Professional portrait session', ARRAY['portrait', 'studio'], true),
--   ('PerPic Brand Identity', 'Graphic Design', 'Complete brand identity design', ARRAY['branding', 'logo'], true);

-- INSERT INTO certificates (title, issuer, date) VALUES
--   ('Virtual Assistant Freelancing Training', 'DICT', 'June 2026'),
--   ('On-the-Job Training Certificate', 'REDi – Romblon State University', 'May 2026');
