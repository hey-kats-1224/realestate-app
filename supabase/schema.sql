-- ============================================================
-- 不動産管理アプリ: propertiesテーブルの作成とRLS設定
-- Supabase ダッシュボードの SQL Editor で実行してください
-- ============================================================

-- propertiesテーブルの作成
CREATE TABLE properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  rent        INTEGER     NOT NULL CHECK (rent >= 0),
  area        TEXT        NOT NULL,
  floor_plan  TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security（RLS）を有効化
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 自分が登録した物件のみ参照できるポリシー
CREATE POLICY "自分の物件のみ参照可能"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

-- 自分のuser_idでのみ登録できるポリシー
CREATE POLICY "自分の物件のみ登録可能"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できるポリシー
CREATE POLICY "自分の物件のみ更新可能"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できるポリシー
CREATE POLICY "自分の物件のみ削除可能"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);
