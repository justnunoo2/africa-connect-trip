-- Add organizer information to group_trips table
ALTER TABLE public.group_trips
ADD COLUMN organizer_name TEXT NOT NULL DEFAULT 'TripLink Africa Team',
ADD COLUMN organizer_bio TEXT,
ADD COLUMN organizer_image_url TEXT,
ADD COLUMN organizer_phone TEXT,
ADD COLUMN organizer_email TEXT;