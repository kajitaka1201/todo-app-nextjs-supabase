export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string;
          title: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          completed?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
