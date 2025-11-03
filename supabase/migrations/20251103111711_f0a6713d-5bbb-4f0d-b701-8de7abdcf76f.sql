-- Add latitude and longitude columns to destinations table
ALTER TABLE public.destinations 
ADD COLUMN latitude numeric,
ADD COLUMN longitude numeric;

-- Add latitude and longitude columns to accommodations table
ALTER TABLE public.accommodations 
ADD COLUMN latitude numeric,
ADD COLUMN longitude numeric;

-- Add some sample coordinates for existing destinations
COMMENT ON COLUMN public.destinations.latitude IS 'Latitude coordinate for map display';
COMMENT ON COLUMN public.destinations.longitude IS 'Longitude coordinate for map display';
COMMENT ON COLUMN public.accommodations.latitude IS 'Latitude coordinate for map display';
COMMENT ON COLUMN public.accommodations.longitude IS 'Longitude coordinate for map display';