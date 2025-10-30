import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import { Card } from "@/components/ui/card";
import { Star, TrendingUp, Shield, Heart } from "lucide-react";
import serengetiImage from "@/assets/destination-serengeti.jpg";
import capetownImage from "@/assets/destination-capetown.jpg";
import egyptImage from "@/assets/destination-egypt.jpg";

const Index = () => {
  const featuredDestinations = [
    {
      name: "Serengeti National Park",
      country: "Tanzania",
      description: "Experience the great migration and witness millions of wildebeest crossing the plains.",
      image: serengetiImage,
      rating: 4.9,
      reviews: 2847,
    },
    {
      name: "Cape Town",
      country: "South Africa",
      description: "Where mountains meet the ocean. Explore Table Mountain and pristine beaches.",
      image: capetownImage,
      rating: 4.8,
      reviews: 3921,
    },
    {
      name: "Pyramids of Giza",
      country: "Egypt",
      description: "Ancient wonders that have stood the test of time. Explore the mysteries of Egypt.",
      image: egyptImage,
      rating: 4.7,
      reviews: 5124,
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Competitive rates and transparent pricing",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Safe and verified accommodations",
    },
    {
      icon: Heart,
      title: "Local Experts",
      description: "Authentic experiences from locals",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Featured Destinations */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Popular <span className="bg-gradient-hero bg-clip-text text-transparent">Destinations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most breathtaking locations across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose TripLink Africa</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make African travel seamless and unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8 text-center shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            What <span className="bg-gradient-accent bg-clip-text text-transparent">Travelers Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah Johnson",
              location: "United States",
              text: "TripLink Africa made planning my safari adventure so easy. The local guides were incredible!",
            },
            {
              name: "James Chen",
              location: "Singapore",
              text: "Best travel platform for Africa. Found amazing accommodations and authentic experiences.",
            },
            {
              name: "Maria Garcia",
              location: "Spain",
              text: "The group trip feature is brilliant. Made friends from around the world while exploring Egypt!",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-card border-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
