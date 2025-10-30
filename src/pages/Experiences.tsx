import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import marketImage from "@/assets/experience-market.jpg";

const Experiences = () => {
  const experiences = [
    {
      name: "Traditional Cooking Class",
      host: "Chef Amara",
      location: "Marrakech, Morocco",
      duration: "3 hours",
      groupSize: "8 people max",
      rating: 5.0,
      reviews: 89,
      price: 65,
      image: marketImage,
    },
    {
      name: "Safari Photography Tour",
      host: "David K.",
      location: "Maasai Mara, Kenya",
      duration: "Full day",
      groupSize: "6 people max",
      rating: 4.9,
      reviews: 124,
      price: 250,
      image: marketImage,
    },
    {
      name: "Cultural Village Walk",
      host: "Grace M.",
      location: "Zanzibar, Tanzania",
      duration: "2 hours",
      groupSize: "10 people max",
      rating: 4.8,
      reviews: 67,
      price: 45,
      image: marketImage,
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
              Local <span className="bg-gradient-accent bg-clip-text text-transparent">Experiences</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with local hosts and immerse yourself in authentic African culture and traditions.
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <Card key={index} className="overflow-hidden group shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={experience.image}
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
                    Hosted by <span className="font-medium text-foreground">{experience.host}</span>
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4">{experience.location}</p>

                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{experience.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${experience.price}</span>
                      <span className="text-muted-foreground text-sm">/person</span>
                    </div>
                    <Button>Book Experience</Button>
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

export default Experiences;
