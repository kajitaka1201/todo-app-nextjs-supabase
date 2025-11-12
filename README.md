# Todo App - Next.js + Supabase + Zustand

Next.js、Supabase、Zustand、TypeScript で作成したモダンな Todo アプリケーションです。

## 🚀 技術スタック

- **Next.js 16** - React フレームワーク
- **TypeScript** - 型安全性
- **Supabase** - バックエンド（PostgreSQL データベース + 認証）
- **Zustand** - 状態管理
- **Tailwind CSS** - スタイリング

## 📋 機能

- ✅ ユーザー認証（サインアップ/ログイン/ログアウト）
- ✅ ユーザーごとのデータ分離
- ✅ Todo の追加
- ✅ Todo の完了/未完了の切り替え
- ✅ Todo の削除
- ✅ リアルタイムでデータベースと同期
- ✅ Row Level Security (RLS) による安全なデータアクセス
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
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null
);

-- user_idにインデックスを作成（パフォーマンス向上）
create index idx_todos_user_id on todos(user_id);

-- Row Level Security (RLS) を有効化
alter table todos enable row level security;

-- ユーザーは自分のTodoのみ閲覧可能
create policy "Users can view their own todos"
on todos for select
using (auth.uid() = user_id);

-- ユーザーは自分のTodoのみ挿入可能
create policy "Users can insert their own todos"
on todos for insert
with check (auth.uid() = user_id);

-- ユーザーは自分のTodoのみ更新可能
create policy "Users can update their own todos"
on todos for update
using (auth.uid() = user_id);

-- ユーザーは自分のTodoのみ削除可能
create policy "Users can delete their own todos"
on todos for delete
using (auth.uid() = user_id);
```

**既存のプロジェクトを更新する場合**は、`supabase_migration.sql`ファイルを参照してください。

### 2. Supabase 認証の設定

1. Supabase ダッシュボード → Authentication → Settings
2. Email Provider が有効になっていることを確認
3. （オプション）メール確認を無効にする場合：
   - "Enable email confirmations" をオフにする（開発環境の場合）

### 3. 環境変数の設定

`.env.local` ファイルを編集して、Supabase の認証情報を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**認証情報の取得方法：**

- Supabase ダッシュボード → Settings → API
- `Project URL` を `NEXT_PUBLIC_SUPABASE_URL` にコピー
- `anon public` キーを `NEXT_PUBLIC_SUPABASE_ANON_KEY` にコピー

### 4. 依存関係のインストール

```bash
npm install
```

### 5. 開発サーバーの起動

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
│   │   ├── AuthForm.tsx          # 認証フォーム
│   │   ├── TodoForm.tsx          # Todo追加フォーム
│   │   ├── TodoItem.tsx          # Todo個別アイテム
│   │   └── TodoList.tsx          # Todoリスト
│   ├── lib/
│   │   └── supabase.ts           # Supabaseクライアント
│   └── store/
│       ├── authStore.ts          # 認証状態管理
│       └── todoStore.ts          # Todo状態管理
├── types/
│   ├── database.ts               # データベース型定義
│   └── todo.ts                   # Todo型定義
├── .env.local                    # 環境変数（Git管理外）
├── supabase_migration.sql        # データベースマイグレーション
└── package.json
```

## 🎯 使い方

### 初回利用時

1. **アカウント登録**: メールアドレスとパスワードを入力して「登録」
2. ログインすると Todo 管理画面が表示されます

### Todo 管理

1. **Todo を追加**: 上部の入力フォームにタスクを入力して「追加」ボタンをクリック
2. **完了/未完了の切り替え**: チェックボックスをクリック
3. **Todo を削除**: 「削除」ボタンをクリック
4. **ログアウト**: 右上の「ログアウト」ボタンをクリック

## 🔐 セキュリティについて

このアプリケーションは Supabase の Row Level Security (RLS) を使用して、ユーザーごとにデータを安全に分離しています。

- 各ユーザーは自分の Todo のみ閲覧・編集・削除できます
- 他のユーザーのデータにはアクセスできません
- すべてのデータベース操作は RLS ポリシーによって保護されています

## 📝 ライセンス

MIT
