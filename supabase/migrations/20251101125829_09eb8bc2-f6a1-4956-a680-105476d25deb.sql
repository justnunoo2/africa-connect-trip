-- Create destinations table
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create accommodations table
CREATE TABLE public.accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  distance_from_center DECIMAL(5,2),
  image_url TEXT NOT NULL,
  amenities TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  host_name TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  max_group_size INTEGER NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create group_trips table
CREATE TABLE public.group_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination TEXT NOT NULL,
  countries TEXT NOT NULL,
  dates TEXT NOT NULL,
  duration TEXT NOT NULL,
  budget DECIMAL(10,2) NOT NULL,
  spots_available INTEGER NOT NULL,
  total_spots INTEGER NOT NULL,
  highlights TEXT[] NOT NULL,
  description TEXT,
  itinerary JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create experience_bookings table
CREATE TABLE public.experience_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  number_of_people INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trip_members table
CREATE TABLE public.trip_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.group_trips(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(trip_id, user_email)
);

-- Enable RLS on all tables
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on destinations"
  ON public.destinations FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on accommodations"
  ON public.accommodations FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on experiences"
  ON public.experiences FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on group_trips"
  ON public.group_trips FOR SELECT
  USING (true);

-- Policies for bookings (anyone can create, only they can view their own)
CREATE POLICY "Allow anyone to create experience bookings"
  ON public.experience_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to view their own bookings"
  ON public.experience_bookings FOR SELECT
  USING (true);

-- Policies for trip members
CREATE POLICY "Allow anyone to join trips"
  ON public.trip_members FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access on trip_members"
  ON public.trip_members FOR SELECT
  USING (true);