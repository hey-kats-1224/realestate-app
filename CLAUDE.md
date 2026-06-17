# realestate-app

Supabase認証機能付きの不動産管理Webアプリ。

## 技術スタック

- **React 18** — UIフレームワーク
- **Vite 5** — ビルドツール・開発サーバー
- **React Router v6** — クライアントサイドルーティング
- **Supabase** — 認証・バックエンド（BaaS）

## プロジェクト構成

```
realestate-app/
├── index.html
├── package.json
├── vite.config.js
├── .env                    # 環境変数（Git管理外）
├── .env.example            # 環境変数のテンプレート
├── .gitignore
└── src/
    ├── main.jsx            # エントリーポイント
    ├── App.jsx             # ルーティング定義
    ├── index.css           # グローバルスタイル
    ├── supabaseClient.js   # Supabaseクライアント初期化
    ├── contexts/
    │   └── AuthContext.jsx # 認証状態管理（Context API）
    ├── pages/
    │   ├── Login.jsx       # ログイン画面
    │   ├── Register.jsx    # 会員登録画面
    │   └── Properties.jsx  # 物件一覧画面
    └── components/
        ├── PrivateRoute.jsx   # 認証ガード
        └── PropertyCard.jsx   # 物件カードコンポーネント
```

## 開発・実行方法

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開く。

## 環境変数

`.env` ファイルを作成し、以下を設定する（`.env.example` を参照）。

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 画面・ルーティング

| パス | 画面 | 認証 |
|------|------|------|
| `/login` | ログイン | 不要 |
| `/register` | 会員登録 | 不要 |
| `/properties` | 物件一覧 | 必要（未ログインは `/login` へリダイレクト） |

## Git 運用ルール

- **コードを変更するたびに、変更内容を `git commit` してから GitHub にプッシュする**
- コミットメッセージは変更内容を簡潔に日本語で記述する
- プッシュ先リポジトリ: `https://github.com/hey-kats-1224/realestate-app.git`
- ブランチ: `main`
- `.env` は絶対にコミットしない（`.gitignore` で除外済み）

### 毎回の作業フロー

```bash
git add <変更ファイル>
git commit -m "変更内容の説明"
git push origin main
```

## コーディング規約

- `let` / `const` を使用し `var` は使わない
- コメントは日本語で記載する
- 状態管理は React Context API を使用する
- 外部ライブラリを追加する場合はユーザーに確認する
