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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          address: string | null
          appointment_date: string
          cancellation_reason: string | null
          client_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          end_time: string
          hourly_rate: number | null
          id: string
          notes: string | null
          nurse_id: string
          payment_status: string | null
          service_type: string | null
          special_instructions: string | null
          staff_member_id: string | null
          start_time: string
          status: Database["public"]["Enums"]["appointment_status"]
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          title: string | null
          total_cost: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          appointment_date: string
          cancellation_reason?: string | null
          client_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time: string
          hourly_rate?: number | null
          id?: string
          notes?: string | null
          nurse_id: string
          payment_status?: string | null
          service_type?: string | null
          special_instructions?: string | null
          staff_member_id?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["appointment_status"]
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          title?: string | null
          total_cost: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          appointment_date?: string
          cancellation_reason?: string | null
          client_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          end_time?: string
          hourly_rate?: number | null
          id?: string
          notes?: string | null
          nurse_id?: string
          payment_status?: string | null
          service_type?: string | null
          special_instructions?: string | null
          staff_member_id?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          title?: string | null
          total_cost?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "nurse_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_staff_member_id_fkey"
            columns: ["staff_member_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      care_logs: {
        Row: {
          attachments: Json | null
          care_plan_id: string | null
          category: string | null
          client_id: string
          content: string
          created_at: string | null
          id: string
          log_date: string
          log_time: string
          shift_id: string | null
          staff_member_id: string | null
        }
        Insert: {
          attachments?: Json | null
          care_plan_id?: string | null
          category?: string | null
          client_id: string
          content: string
          created_at?: string | null
          id?: string
          log_date: string
          log_time: string
          shift_id?: string | null
          staff_member_id?: string | null
        }
        Update: {
          attachments?: Json | null
          care_plan_id?: string | null
          category?: string | null
          client_id?: string
          content?: string
          created_at?: string | null
          id?: string
          log_date?: string
          log_time?: string
          shift_id?: string | null
          staff_member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_logs_care_plan_id_fkey"
            columns: ["care_plan_id"]
            isOneToOne: false
            referencedRelation: "care_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_logs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_logs_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "staff_shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_logs_staff_member_id_fkey"
            columns: ["staff_member_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      care_plan_templates: {
        Row: {
          category: string | null
          created_at: string | null
          form_schema: Json
          id: string
          is_standard: boolean | null
          name: string
          organization_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          form_schema?: Json
          id?: string
          is_standard?: boolean | null
          name: string
          organization_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          form_schema?: Json
          id?: string
          is_standard?: boolean | null
          name?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_plan_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      care_plans: {
        Row: {
          client_id: string
          created_at: string | null
          created_by: string | null
          goals: Json | null
          id: string
          interventions: Json | null
          last_updated_by: string | null
          organization_id: string
          review_date: string | null
          risk_assessment: Json | null
          start_date: string
          status: string | null
          template_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          created_by?: string | null
          goals?: Json | null
          id?: string
          interventions?: Json | null
          last_updated_by?: string | null
          organization_id: string
          review_date?: string | null
          risk_assessment?: Json | null
          start_date: string
          status?: string | null
          template_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          created_by?: string | null
          goals?: Json | null
          id?: string
          interventions?: Json | null
          last_updated_by?: string | null
          organization_id?: string
          review_date?: string | null
          risk_assessment?: Json | null
          start_date?: string
          status?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "care_plan_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      client_staff_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          client_id: string
          created_at: string | null
          id: string
          is_primary: boolean | null
          notes: string | null
          organization_id: string
          staff_member_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          client_id: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          organization_id: string
          staff_member_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          client_id?: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          organization_id?: string
          staff_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_staff_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_staff_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_staff_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_staff_assignments_staff_member_id_fkey"
            columns: ["staff_member_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          rate: number
          staff_shift_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity: number
          rate: number
          staff_shift_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          rate?: number
          staff_shift_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_line_items_staff_shift_id_fkey"
            columns: ["staff_shift_id"]
            isOneToOne: false
            referencedRelation: "staff_shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          billing_period_end: string
          billing_period_start: string
          client_id: string
          created_at: string
          created_by: string | null
          due_date: string
          id: string
          invoice_number: string
          notes: string | null
          organization_id: string
          paid_date: string | null
          status: string
          stripe_invoice_id: string | null
          stripe_payment_intent: string | null
          total_amount: number
          total_hours: number
          updated_at: string
        }
        Insert: {
          billing_period_end: string
          billing_period_start: string
          client_id: string
          created_at?: string
          created_by?: string | null
          due_date: string
          id?: string
          invoice_number: string
          notes?: string | null
          organization_id: string
          paid_date?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent?: string | null
          total_amount: number
          total_hours: number
          updated_at?: string
        }
        Update: {
          billing_period_end?: string
          billing_period_start?: string
          client_id?: string
          created_at?: string
          created_by?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          notes?: string | null
          organization_id?: string
          paid_date?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent?: string | null
          total_amount?: number
          total_hours?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_administrations: {
        Row: {
          actual_time: string | null
          administered_by: string
          created_at: string | null
          id: string
          medication_record_id: string
          notes: string | null
          scheduled_time: string
          status: string | null
          witnessed_by: string | null
        }
        Insert: {
          actual_time?: string | null
          administered_by: string
          created_at?: string | null
          id?: string
          medication_record_id: string
          notes?: string | null
          scheduled_time: string
          status?: string | null
          witnessed_by?: string | null
        }
        Update: {
          actual_time?: string | null
          administered_by?: string
          created_at?: string | null
          id?: string
          medication_record_id?: string
          notes?: string | null
          scheduled_time?: string
          status?: string | null
          witnessed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_administrations_administered_by_fkey"
            columns: ["administered_by"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_administrations_medication_record_id_fkey"
            columns: ["medication_record_id"]
            isOneToOne: false
            referencedRelation: "medication_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_administrations_witnessed_by_fkey"
            columns: ["witnessed_by"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_records: {
        Row: {
          care_plan_id: string | null
          client_id: string
          created_at: string | null
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          is_active: boolean | null
          medication_name: string
          prescriber_name: string | null
          route: string | null
          scheduled_times: string[] | null
          start_date: string
        }
        Insert: {
          care_plan_id?: string | null
          client_id: string
          created_at?: string | null
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          is_active?: boolean | null
          medication_name: string
          prescriber_name?: string | null
          route?: string | null
          scheduled_times?: string[] | null
          start_date: string
        }
        Update: {
          care_plan_id?: string | null
          client_id?: string
          created_at?: string | null
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          medication_name?: string
          prescriber_name?: string | null
          route?: string | null
          scheduled_times?: string[] | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_records_care_plan_id_fkey"
            columns: ["care_plan_id"]
            isOneToOne: false
            referencedRelation: "care_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_records_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          appointment_id: string | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: Database["public"]["Enums"]["message_type"]
          read_at: string | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          appointment_id?: string | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"]
          read_at?: string | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          appointment_id?: string | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"]
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          id: string
          notification_type: string
          push_enabled: boolean | null
          sms_enabled: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notification_type: string
          push_enabled?: boolean | null
          sms_enabled?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notification_type?: string
          push_enabled?: boolean | null
          sms_enabled?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          metadata: Json | null
          organization_id: string | null
          priority: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          metadata?: Json | null
          organization_id?: string | null
          priority?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          metadata?: Json | null
          organization_id?: string | null
          priority?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nurse_organizations: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          owner_id: string
          phone: string | null
          registration_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          owner_id: string
          phone?: string | null
          registration_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          owner_id?: string
          phone?: string | null
          registration_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nurse_organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nurse_profiles: {
        Row: {
          availability_schedule: Json | null
          bio: string | null
          certifications: string[] | null
          created_at: string
          hourly_rate: number | null
          id: string
          insurance_verified: boolean | null
          is_available: boolean | null
          is_background_checked: boolean | null
          license_expiry: string
          license_number: string
          license_state: string
          profile_id: string | null
          rating: number | null
          specialties: string[] | null
          total_reviews: number | null
          updated_at: string
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          availability_schedule?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string
          hourly_rate?: number | null
          id: string
          insurance_verified?: boolean | null
          is_available?: boolean | null
          is_background_checked?: boolean | null
          license_expiry: string
          license_number: string
          license_state: string
          profile_id?: string | null
          rating?: number | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          availability_schedule?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string
          hourly_rate?: number | null
          id?: string
          insurance_verified?: boolean | null
          is_available?: boolean | null
          is_background_checked?: boolean | null
          license_expiry?: string
          license_number?: string
          license_state?: string
          profile_id?: string | null
          rating?: number | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nurse_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string
          payment_method: string
          processed_at: string | null
          status: string
          stripe_payment_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_id: string
          payment_method: string
          processed_at?: string | null
          status?: string
          stripe_payment_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string
          payment_method?: string
          processed_at?: string | null
          status?: string
          stripe_payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          id: string
          is_verified: boolean | null
          last_name: string | null
          phone: string | null
          profile_image_url: string | null
          role: string | null
          state: string | null
          updated_at: string
          user_id: string | null
          user_role: Database["public"]["Enums"]["user_role"]
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_verified?: boolean | null
          last_name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"]
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["user_role"]
          zip_code?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          appointment_id: string
          client_id: string
          comment: string | null
          created_at: string
          id: string
          nurse_id: string
          rating: number
        }
        Insert: {
          appointment_id: string
          client_id: string
          comment?: string | null
          created_at?: string
          id?: string
          nurse_id: string
          rating: number
        }
        Update: {
          appointment_id?: string
          client_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          nurse_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: true
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "nurse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_professionals: {
        Row: {
          client_id: string
          created_at: string
          id: string
          notes: string | null
          nurse_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          notes?: string | null
          nurse_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          nurse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_professionals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_professionals_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "nurse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_swap_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          covering_staff_id: string | null
          created_at: string | null
          id: string
          original_shift_id: string
          request_reason: string | null
          requesting_staff_id: string
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          covering_staff_id?: string | null
          created_at?: string | null
          id?: string
          original_shift_id: string
          request_reason?: string | null
          requesting_staff_id: string
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          covering_staff_id?: string | null
          created_at?: string | null
          id?: string
          original_shift_id?: string
          request_reason?: string | null
          requesting_staff_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_swap_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_swap_requests_covering_staff_id_fkey"
            columns: ["covering_staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_swap_requests_original_shift_id_fkey"
            columns: ["original_shift_id"]
            isOneToOne: false
            referencedRelation: "staff_shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_swap_requests_requesting_staff_id_fkey"
            columns: ["requesting_staff_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_templates: {
        Row: {
          break_duration_minutes: number | null
          created_at: string | null
          end_time: string
          id: string
          name: string
          organization_id: string
          start_time: string
        }
        Insert: {
          break_duration_minutes?: number | null
          created_at?: string | null
          end_time: string
          id?: string
          name: string
          organization_id: string
          start_time: string
        }
        Update: {
          break_duration_minutes?: number | null
          created_at?: string | null
          end_time?: string
          id?: string
          name?: string
          organization_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_members: {
        Row: {
          created_at: string | null
          employment_type: string | null
          end_date: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          job_title: string | null
          organization_id: string
          profile_id: string | null
          qualifications: Json | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employment_type?: string | null
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          organization_id: string
          profile_id?: string | null
          qualifications?: Json | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employment_type?: string | null
          end_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          job_title?: string | null
          organization_id?: string
          profile_id?: string | null
          qualifications?: Json | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_shifts: {
        Row: {
          appointment_id: string | null
          break_minutes: number | null
          client_id: string | null
          created_at: string | null
          created_by: string | null
          end_time: string
          id: string
          notes: string | null
          organization_id: string
          shift_date: string
          staff_member_id: string
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          break_minutes?: number | null
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          end_time: string
          id?: string
          notes?: string | null
          organization_id: string
          shift_date: string
          staff_member_id: string
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          break_minutes?: number | null
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          organization_id?: string
          shift_date?: string
          staff_member_id?: string
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_shifts_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_shifts_staff_member_id_fkey"
            columns: ["staff_member_id"]
            isOneToOne: false
            referencedRelation: "staff_members"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean | null
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          stripe_customer_id?: string | null
          subscribed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean | null
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          nurse_organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          nurse_organization_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          nurse_organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_org_fk"
            columns: ["nurse_organization_id"]
            isOneToOne: false
            referencedRelation: "nurse_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _org_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_owner: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "owner" | "manager" | "staff_nurse" | "care_assistant" | "admin"
      appointment_status: "pending" | "confirmed" | "completed" | "cancelled"
      message_type: "text" | "system" | "appointment"
      user_role: "client" | "nurse" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "manager", "staff_nurse", "care_assistant", "admin"],
      appointment_status: ["pending", "confirmed", "completed", "cancelled"],
      message_type: ["text", "system", "appointment"],
      user_role: ["client", "nurse", "admin"],
    },
  },
} as const
