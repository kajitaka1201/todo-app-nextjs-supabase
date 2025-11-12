import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({ user: session?.user ?? null, initialized: true });

      // 認証状態の変更を監視
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null });
      });
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ initialized: true });
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      // メール確認が必要な場合はユーザーに通知
      if (data.user && !data.session) {
        set({
          user: null,
          loading: false,
          error: "確認メールを送信しました。メールを確認してアカウントを有効化してください。",
        });
      } else {
        set({ user: data.user, loading: false });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      set({
        error: error instanceof Error ? error.message : "サインアップに失敗しました",
        loading: false,
      });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // メール未確認エラーの場合、わかりやすいメッセージに変換
        if (error.message.includes("Email not confirmed")) {
          throw new Error("メールアドレスが確認されていません。登録時に送信された確認メールのリンクをクリックしてください。");
        }
        throw error;
      }

      set({ user: data.user, loading: false });
    } catch (error) {
      console.error("Error signing in:", error);
      set({
        error: error instanceof Error ? error.message : "ログインに失敗しました",
        loading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({ user: null, loading: false });
    } catch (error) {
      console.error("Error signing out:", error);
      set({
        error: error instanceof Error ? error.message : "ログアウトに失敗しました",
        loading: false,
      });
    }
  },
}));
