import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Heart, Users, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "We connect travelers with genuine local experiences and cultural immersion.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Supporting local communities and fostering meaningful connections.",
    },
    {
      icon: Globe,
      title: "Sustainable Travel",
      description: "Promoting responsible tourism that benefits both travelers and destinations.",
    },
    {
      icon: Target,
      title: "Accessible Adventure",
      description: "Making African travel accessible and seamless for everyone.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-hero bg-clip-text text-transparent">TripLink Africa</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to showcase Africa's incredible diversity, connecting curious travelers 
              with unforgettable experiences and welcoming hosts across the continent.
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="p-8 md:p-12 shadow-card border-0 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  TripLink Africa was born from a simple belief: that Africa's stories, landscapes, and 
                  people deserve to be experienced firsthand, not just read about or watched from afar.
                </p>
                <p>
                  We saw travelers struggling to plan African adventures – fragmented booking systems, 
                  language barriers, and limited access to local knowledge. At the same time, incredible 
                  hosts and guides had amazing experiences to share but lacked the platform to reach travelers.
                </p>
                <p>
                  So we built TripLink Africa – a platform that brings it all together. Destinations, 
                  accommodations, experiences, and community in one seamless space. We're here to make 
                  African travel accessible, authentic, and absolutely unforgettable.
                </p>
              </div>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 text-center shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-hero text-primary-foreground p-8 md:p-12 shadow-elevated border-0 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-center leading-relaxed">
                To create a vibrant ecosystem where travelers discover Africa's hidden gems, 
                local communities thrive through tourism, and every journey contributes to 
                sustainable development and cultural exchange across the continent.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
