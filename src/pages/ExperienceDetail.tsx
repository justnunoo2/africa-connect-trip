import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Star, Clock, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import BookExperienceDialog from "@/components/BookExperienceDialog";
import ImageGallery from "@/components/ImageGallery";

interface Experience {
  id: string;
  name: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  review_count: number;
  max_group_size: number;
  host_name: string;
  image_url: string;
}

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load experience details",
          variant: "destructive",
        });
      } else {
        setExperience(data);
      }
      setLoading(false);
    };

    fetchExperience();
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

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl mb-4">Experience not found</p>
          <Button onClick={() => navigate("/experiences")}>Back to Experiences</Button>
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
            onClick={() => navigate("/experiences")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experiences
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <ImageGallery
                  mainImage={experience.image_url}
                  subImages={[
                    experience.image_url,
                    experience.image_url,
                    experience.image_url,
                  ]}
                  alt={experience.name}
                />
                <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{experience.rating}</span>
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">{experience.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{experience.location}</span>
                </div>
              </div>

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </Card>

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Professional guide
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    All equipment and materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Light refreshments
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">Hosted by {experience.host_name}</h2>
                <p className="text-muted-foreground">
                  An experienced local guide passionate about sharing authentic African experiences.
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 shadow-elevated sticky top-24">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2 pb-4 border-b">
                    <span className="text-4xl font-bold">${experience.price}</span>
                    <span className="text-muted-foreground">/person</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="font-medium">{experience.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Max Group Size</div>
                        <div className="font-medium">{experience.max_group_size} people</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                        <div className="font-medium">{experience.rating} ({experience.review_count} reviews)</div>
                      </div>
                    </div>
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

      <BookExperienceDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        experience={experience}
      />

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
