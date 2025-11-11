import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Star, Wifi, Coffee, Wind, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import BookAccommodationDialog from "@/components/BookAccommodationDialog";
import ImageGallery from "@/components/ImageGallery";

interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  price_per_night: number;
  rating: number;
  review_count: number;
  amenities: string[];
  image_url: string;
  distance_from_center: number;
}

const AccommodationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAccommodation = async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load accommodation details",
          variant: "destructive",
        });
      } else {
        setAccommodation(data);
      }
      setLoading(false);
    };

    fetchAccommodation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl mb-4">Accommodation not found</p>
          <Button onClick={() => navigate("/accommodations")}>Back to Accommodations</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/accommodations")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Accommodations
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <ImageGallery
                  mainImage={accommodation.image_url}
                  subImages={[
                    accommodation.image_url,
                    accommodation.image_url,
                    accommodation.image_url,
                  ]}
                  alt={accommodation.name}
                />
                <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{accommodation.rating}</span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">{accommodation.name}</h1>
                <span className="bg-secondary px-3 py-1 rounded-full text-sm font-medium">
                  {accommodation.type}
                </span>
              </div>

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">{accommodation.description}</p>
              </Card>

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {accommodation.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wifi className="h-4 w-4 text-primary" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 shadow-elevated sticky top-24">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2 pb-4 border-b">
                    <span className="text-4xl font-bold">${accommodation.price_per_night}</span>
                    <span className="text-muted-foreground">/night</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{accommodation.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reviews</span>
                      <span className="font-medium">{accommodation.review_count}</span>
                    </div>

                    {accommodation.distance_from_center && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Distance from center</span>
                        <span className="font-medium">{accommodation.distance_from_center} km</span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={() => setBookingDialogOpen(true)}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <BookAccommodationDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        accommodation={accommodation}
      />

      <Footer />
    </div>
  );
};

export default AccommodationDetail;
