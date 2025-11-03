import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import DestinationsMap from "@/components/DestinationsMap";
import { supabase } from "@/integrations/supabase/client";
import serengetiImage from "@/assets/destination-serengeti.jpg";
import capetownImage from "@/assets/destination-capetown.jpg";
import egyptImage from "@/assets/destination-egypt.jpg";

const Destinations = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("rating", { ascending: false });

      if (error) {
        console.error("Error fetching destinations:", error);
        // Fallback to static data
        setDestinations([
          {
            name: "Serengeti National Park",
            country: "Tanzania",
            description: "Experience the great migration and witness millions of wildebeest crossing the plains. Home to the Big Five and endless savanna landscapes.",
            image: serengetiImage,
            rating: 4.9,
            reviews: 2847,
          },
          {
            name: "Cape Town",
            country: "South Africa",
            description: "Where mountains meet the ocean. Explore Table Mountain, pristine beaches, vibrant culture, and world-class wine regions.",
            image: capetownImage,
            rating: 4.8,
            reviews: 3921,
          },
          {
            name: "Pyramids of Giza",
            country: "Egypt",
            description: "Ancient wonders that have stood the test of time. Explore the last remaining Wonder of the Ancient World and the mysterious Sphinx.",
            image: egyptImage,
            rating: 4.7,
            reviews: 5124,
          },
        ]);
      } else {
        setDestinations(data || []);
      }
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="bg-gradient-hero bg-clip-text text-transparent">Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most breathtaking locations across Africa. From wildlife safaris to ancient wonders.
            </p>
          </div>

          {/* Interactive Map */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Explore on Map</h2>
            <DestinationsMap 
              markers={destinations.map(d => ({
                id: d.id || d.name,
                name: d.name,
                latitude: d.latitude || 0,
                longitude: d.longitude || 0,
                description: d.country
              }))}
            />
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-center col-span-full">Loading destinations...</p>
            ) : (
              destinations.map((destination, index) => (
                <div key={destination.id || index} style={{ animationDelay: `${index * 100}ms` }}>
                  <DestinationCard {...destination} image={destination.image_url || destination.image} reviews={destination.review_count || destination.reviews} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Destinations;
