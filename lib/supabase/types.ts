/**
 * Database types for the Supabase project `vom-website`.
 * The `Database` type is what the Supabase MCP's type generator returned on
 * 2026-11-11, after the migrations in supabase/migrations/. Regenerate it after
 * every migration. The helper types at the foot are a shortened form of the
 * generator's own (public schema only).
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      authors: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          credentials: string | null
          id: string
          job_title: string | null
          name: string
          same_as: string[]
          slug: string
          updated_at: string
          wp_id: number | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          credentials?: string | null
          id?: string
          job_title?: string | null
          name: string
          same_as?: string[]
          slug: string
          updated_at?: string
          wp_id?: number | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          credentials?: string | null
          id?: string
          job_title?: string | null
          name?: string
          same_as?: string[]
          slug?: string
          updated_at?: string
          wp_id?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          intro: string | null
          lang: string
          name: string
          path: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          updated_at: string
          wp_id: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          intro?: string | null
          lang?: string
          name: string
          path: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          updated_at?: string
          wp_id?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          intro?: string | null
          lang?: string
          name?: string
          path?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          updated_at?: string
          wp_id?: number | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          form: string
          id: string
          locale: string | null
          message: string | null
          name: string | null
          page_path: string | null
          payload: Json | null
          phone: string | null
          user_agent: string | null
          utm: Json | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          form: string
          id?: string
          locale?: string | null
          message?: string | null
          name?: string | null
          page_path?: string | null
          payload?: Json | null
          phone?: string | null
          user_agent?: string | null
          utm?: Json | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          form?: string
          id?: string
          locale?: string | null
          message?: string | null
          name?: string | null
          page_path?: string | null
          payload?: Json | null
          phone?: string | null
          user_agent?: string | null
          utm?: Json | null
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          alternate_post_id: string | null
          author_id: string | null
          content_html: string
          content_json: Json | null
          cover_alt: string | null
          cover_height: number | null
          cover_image: string | null
          cover_width: number | null
          created_at: string
          excerpt: string | null
          faq: Json | null
          id: string
          lang: string
          modified_at: string | null
          path: string
          primary_category_id: string | null
          published_at: string | null
          reviewed_by_id: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          type: string
          updated_at: string
          wp_id: number | null
        }
        Insert: {
          alternate_post_id?: string | null
          author_id?: string | null
          content_html?: string
          content_json?: Json | null
          cover_alt?: string | null
          cover_height?: number | null
          cover_image?: string | null
          cover_width?: number | null
          created_at?: string
          excerpt?: string | null
          faq?: Json | null
          id?: string
          lang?: string
          modified_at?: string | null
          path: string
          primary_category_id?: string | null
          published_at?: string | null
          reviewed_by_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          type?: string
          updated_at?: string
          wp_id?: number | null
        }
        Update: {
          alternate_post_id?: string | null
          author_id?: string | null
          content_html?: string
          content_json?: Json | null
          cover_alt?: string | null
          cover_height?: number | null
          cover_image?: string | null
          cover_width?: number | null
          created_at?: string
          excerpt?: string | null
          faq?: Json | null
          id?: string
          lang?: string
          modified_at?: string | null
          path?: string
          primary_category_id?: string | null
          published_at?: string | null
          reviewed_by_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
          wp_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_alternate_post_id_fkey"
            columns: ["alternate_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_primary_category_id_fkey"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_reviewed_by_id_fkey"
            columns: ["reviewed_by_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicTables = Database["public"]["Tables"]

export type Tables<T extends keyof PublicTables> = PublicTables[T]["Row"]
export type TablesInsert<T extends keyof PublicTables> = PublicTables[T]["Insert"]
export type TablesUpdate<T extends keyof PublicTables> = PublicTables[T]["Update"]
