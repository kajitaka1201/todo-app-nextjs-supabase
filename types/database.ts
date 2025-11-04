import type { Todo } from "./todo";

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: Todo;
        Insert: {
          title: string;
          completed?: boolean;
        };
        Update: {
          title?: string;
          completed?: boolean;
        };
      };
    };
  };
}
