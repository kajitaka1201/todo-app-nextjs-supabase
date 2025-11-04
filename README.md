# Todo App - Next.js + Supabase + Zustand

Next.js、Supabase、Zustand、TypeScript で作成したモダンな Todo アプリケーションです。

## 🚀 技術スタック

- **Next.js 16** - React フレームワーク
- **TypeScript** - 型安全性
- **Supabase** - バックエンド（PostgreSQL データベース）
- **Zustand** - 状態管理
- **Tailwind CSS** - スタイリング

## 📋 機能

- ✅ Todo の追加
- ✅ Todo の完了/未完了の切り替え
- ✅ Todo の削除
- ✅ リアルタイムでデータベースと同期
- ✅ レスポンシブデザイン

## 🔧 セットアップ

### 1. Supabase プロジェクトの作成

1. [Supabase](https://supabase.com)でアカウントを作成
2. 新しいプロジェクトを作成
3. SQL Editor で以下の SQL を実行してテーブルを作成：

```sql
create table todos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) を有効化
alter table todos enable row level security;

-- 全員が読み書きできるポリシー（開発用）
create policy "Enable read access for all users" on todos for select using (true);
create policy "Enable insert for all users" on todos for insert with check (true);
create policy "Enable update for all users" on todos for update using (true);
create policy "Enable delete for all users" on todos for delete using (true);
```

### 2. 環境変数の設定

`.env.local` ファイルを編集して、Supabase の認証情報を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**認証情報の取得方法：**

- Supabase ダッシュボード → Settings → API
- `Project URL` を `NEXT_PUBLIC_SUPABASE_URL` にコピー
- `anon public` キーを `NEXT_PUBLIC_SUPABASE_ANON_KEY` にコピー

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📁 プロジェクト構造

```
todo-app-nextjs-supabase/
├── src/
│   ├── app/
│   │   ├── globals.css          # グローバルスタイル
│   │   ├── layout.tsx            # ルートレイアウト
│   │   └── page.tsx              # メインページ
│   ├── components/
│   │   ├── TodoForm.tsx          # Todo追加フォーム
│   │   ├── TodoItem.tsx          # Todo個別アイテム
│   │   └── TodoList.tsx          # Todoリスト
│   ├── lib/
│   │   └── supabase.ts           # Supabaseクライアント
│   └── store/
│       └── todoStore.ts          # Zustand状態管理
├── types/
│   ├── database.ts               # データベース型定義
│   └── todo.ts                   # Todo型定義
├── .env.local                    # 環境変数（Git管理外）
└── package.json
```

## 🎯 使い方

1. **Todo を追加**: 上部の入力フォームにタスクを入力して「追加」ボタンをクリック
2. **完了/未完了の切り替え**: チェックボックスをクリック
3. **Todo を削除**: 「削除」ボタンをクリック

## 🔐 セキュリティについて

現在の Row Level Security (RLS) ポリシーは開発用です。本番環境では、認証を実装して適切なポリシーを設定してください。

## 📝 ライセンス

MIT
