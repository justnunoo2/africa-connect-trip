import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Wifi, Coffee, Wind } from "lucide-react";

const Accommodations = () => {
  const accommodations = [
    {
      name: "Serengeti Safari Lodge",
      location: "Serengeti, Tanzania",
      type: "Eco-Lodge",
      rating: 4.9,
      reviews: 342,
      price: 180,
      amenities: ["WiFi", "Restaurant", "Pool"],
    },
    {
      name: "Cape Coastal Retreat",
      location: "Cape Town, South Africa",
      type: "Boutique Hotel",
      rating: 4.8,
      reviews: 521,
      price: 220,
      amenities: ["WiFi", "Ocean View", "Spa"],
    },
    {
      name: "Nile Valley Guesthouse",
      location: "Cairo, Egypt",
      type: "Guesthouse",
      rating: 4.6,
      reviews: 198,
      price: 95,
      amenities: ["WiFi", "Breakfast", "AC"],
    },
  ];

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
              <Card key={index} className="overflow-hidden shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="h-48 bg-gradient-hero relative">
                  <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{place.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {place.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {place.reviews} reviews
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {place.amenities.map((amenity, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${place.price}</span>
                      <span className="text-muted-foreground text-sm">/night</span>
                    </div>
                    <Button>Book Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accommodations;
