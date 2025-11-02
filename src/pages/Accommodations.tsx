import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BookAccommodationDialog from "@/components/BookAccommodationDialog";

interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  review_count: number;
  price_per_night: number;
  amenities: string[];
  image_url: string;
  distance_from_center: number;
  destination_id: string;
}

const Accommodations = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destinationId = searchParams.get("destination");
  
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAccommodations = async () => {
      let query = supabase
        .from("accommodations")
        .select("*")
        .order("distance_from_center", { ascending: true });
      
      if (destinationId) {
        query = query.eq("destination_id", destinationId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching accommodations:", error);
      } else {
        setAccommodations(data || []);
      }
      setLoading(false);
    };

    fetchAccommodations();
  }, [destinationId]);

  const handleBookNow = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setBookingDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Loading accommodations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect <span className="bg-gradient-hero bg-clip-text text-transparent">Stay</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From eco-lodges to boutique hotels, discover accommodations that match your travel style.
            </p>
          </div>

          {/* Accommodations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.map((place, index) => (
              <Card 
                key={place.id} 
                className="overflow-hidden shadow-card hover:shadow-elevated transition-all animate-fade-in border-0 cursor-pointer" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/accommodations/${place.id}`)}
              >
                <div className="h-48 relative">
                  <img 
                    src={place.image_url} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{place.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {place.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {place.review_count} reviews
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {place.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${place.price_per_night}</span>
                      <span className="text-muted-foreground text-sm">/night</span>
                    </div>
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(place);
                    }}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BookAccommodationDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        accommodation={selectedAccommodation}
      />

      <Footer />
    </div>
  );
};

export default Accommodations;
