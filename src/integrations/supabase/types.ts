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
      accommodations: {
        Row: {
          amenities: string[] | null
          created_at: string | null
          description: string | null
          destination_id: string | null
          distance_from_center: number | null
          id: string
          image_url: string
          latitude: number | null
          longitude: number | null
          name: string
          price_per_night: number
          rating: number | null
          review_count: number | null
          type: string
        }
        Insert: {
          amenities?: string[] | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          distance_from_center?: number | null
          id?: string
          image_url: string
          latitude?: number | null
          longitude?: number | null
          name: string
          price_per_night: number
          rating?: number | null
          review_count?: number | null
          type: string
        }
        Update: {
          amenities?: string[] | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          distance_from_center?: number | null
          id?: string
          image_url?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          price_per_night?: number
          rating?: number | null
          review_count?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          country: string
          created_at: string | null
          description: string
          id: string
          image_url: string
          latitude: number | null
          long_description: string | null
          longitude: number | null
          name: string
          rating: number | null
          review_count: number | null
        }
        Insert: {
          country: string
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          latitude?: number | null
          long_description?: string | null
          longitude?: number | null
          name: string
          rating?: number | null
          review_count?: number | null
        }
        Update: {
          country?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          latitude?: number | null
          long_description?: string | null
          longitude?: number | null
          name?: string
          rating?: number | null
          review_count?: number | null
        }
        Relationships: []
      }
      experience_bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          experience_id: string | null
          id: string
          number_of_people: number
          status: string | null
          total_price: number
          user_email: string
          user_name: string
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          experience_id?: string | null
          id?: string
          number_of_people: number
          status?: string | null
          total_price: number
          user_email: string
          user_name: string
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          experience_id?: string | null
          id?: string
          number_of_people?: number
          status?: string | null
          total_price?: number
          user_email?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string
          host_name: string
          id: string
          image_url: string
          location: string
          max_group_size: number
          name: string
          price: number
          rating: number | null
          review_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration: string
          host_name: string
          id?: string
          image_url: string
          location: string
          max_group_size: number
          name: string
          price: number
          rating?: number | null
          review_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string
          host_name?: string
          id?: string
          image_url?: string
          location?: string
          max_group_size?: number
          name?: string
          price?: number
          rating?: number | null
          review_count?: number | null
        }
        Relationships: []
      }
      group_trips: {
        Row: {
          budget: number
          countries: string
          created_at: string | null
          dates: string
          description: string | null
          destination: string
          duration: string
          highlights: string[]
          id: string
          itinerary: Json | null
          organizer_bio: string | null
          organizer_email: string | null
          organizer_image_url: string | null
          organizer_name: string
          organizer_phone: string | null
          spots_available: number
          total_spots: number
        }
        Insert: {
          budget: number
          countries: string
          created_at?: string | null
          dates: string
          description?: string | null
          destination: string
          duration: string
          highlights: string[]
          id?: string
          itinerary?: Json | null
          organizer_bio?: string | null
          organizer_email?: string | null
          organizer_image_url?: string | null
          organizer_name?: string
          organizer_phone?: string | null
          spots_available: number
          total_spots: number
        }
        Update: {
          budget?: number
          countries?: string
          created_at?: string | null
          dates?: string
          description?: string | null
          destination?: string
          duration?: string
          highlights?: string[]
          id?: string
          itinerary?: Json | null
          organizer_bio?: string | null
          organizer_email?: string | null
          organizer_image_url?: string | null
          organizer_name?: string
          organizer_phone?: string | null
          spots_available?: number
          total_spots?: number
        }
        Relationships: []
      }
      trip_members: {
        Row: {
          id: string
          joined_at: string | null
          trip_id: string | null
          user_email: string
          user_name: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          trip_id?: string | null
          user_email: string
          user_name: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          trip_id?: string | null
          user_email?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_members_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "group_trips"
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
    Enums: {},
  },
} as const
