import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BookExperienceDialog from "@/components/BookExperienceDialog";

interface Experience {
  id: string;
  name: string;
  host_name: string;
  location: string;
  duration: string;
  max_group_size: number;
  rating: number;
  review_count: number;
  price: number;
  image_url: string;
  description: string;
}

const Experiences = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("rating", { ascending: false });

      if (error) {
        console.error("Error fetching experiences:", error);
      } else {
        setExperiences(data || []);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const handleBookNow = (experience: Experience) => {
    setSelectedExperience(experience);
    setBookingDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Loading experiences...</p>
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
              Local <span className="bg-gradient-accent bg-clip-text text-transparent">Experiences</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with local hosts and immerse yourself in authentic African culture and traditions.
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <Card 
                key={experience.id} 
                className="overflow-hidden group shadow-card hover:shadow-elevated transition-all animate-fade-in border-0 cursor-pointer" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/experiences/${experience.id}`)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={experience.image_url}
                    alt={experience.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay opacity-40" />
                  <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{experience.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {experience.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    Hosted by <span className="font-medium text-foreground">{experience.host_name}</span>
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4">{experience.location}</p>

                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.max_group_size} people max</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${experience.price}</span>
                      <span className="text-muted-foreground text-sm">/person</span>
                    </div>
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(experience);
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

      {selectedExperience && (
        <BookExperienceDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          experience={selectedExperience}
        />
      )}

      <Footer />
    </div>
  );
};

export default Experiences;
