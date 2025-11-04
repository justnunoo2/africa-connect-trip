-- Create role enum
CREATE TYPE public.app_role AS ENUM ('tourist', 'guide', 'host', 'transport', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'tourist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table for extended user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create guide profiles table
CREATE TABLE public.guide_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  languages TEXT[],
  regions_covered TEXT[],
  years_experience INTEGER,
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.guide_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guides can manage their own profile"
ON public.guide_profiles
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view guide profiles"
ON public.guide_profiles
FOR SELECT
USING (true);

-- Create host profiles table
CREATE TABLE public.host_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  property_count INTEGER DEFAULT 0,
  total_revenue NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.host_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hosts can manage their own profile"
ON public.host_profiles
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create transport profiles table
CREATE TABLE public.transport_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  vehicle_type TEXT,
  vehicle_model TEXT,
  license_plate TEXT,
  capacity INTEGER,
  routes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.transport_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Transport providers can manage their own profile"
ON public.transport_profiles
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view transport profiles"
ON public.transport_profiles
FOR SELECT
USING (true);

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  -- Assign default tourist role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'tourist');
  
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add owner column to experiences table
ALTER TABLE public.experiences
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update experiences RLS
DROP POLICY IF EXISTS "Allow public read access on experiences" ON public.experiences;

CREATE POLICY "Public can view experiences"
ON public.experiences
FOR SELECT
USING (true);

CREATE POLICY "Guides can create experiences"
ON public.experiences
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'guide') AND auth.uid() = owner_id);

CREATE POLICY "Guides can update their own experiences"
ON public.experiences
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Guides can delete their own experiences"
ON public.experiences
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- Add owner column to accommodations table
ALTER TABLE public.accommodations
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update accommodations RLS
DROP POLICY IF EXISTS "Allow public read access on accommodations" ON public.accommodations;

CREATE POLICY "Public can view accommodations"
ON public.accommodations
FOR SELECT
USING (true);

CREATE POLICY "Hosts can create accommodations"
ON public.accommodations
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'host') AND auth.uid() = owner_id);

CREATE POLICY "Hosts can update their own accommodations"
ON public.accommodations
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Hosts can delete their own accommodations"
ON public.accommodations
FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);