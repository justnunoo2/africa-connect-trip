import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, ArrowLeft, Calendar, Users, Clock } from "lucide-react";
import serengetiImage from "@/assets/destination-serengeti.jpg";
import capetownImage from "@/assets/destination-capetown.jpg";
import egyptImage from "@/assets/destination-egypt.jpg";

const DestinationDetail = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Serengeti National Park",
      country: "Tanzania",
      description: "Experience the great migration and witness millions of wildebeest crossing the plains. Home to the Big Five and endless savanna landscapes.",
      fullDescription: "The Serengeti National Park is one of Africa's most famous wildlife sanctuaries. Spanning 14,750 square kilometers of pristine wilderness, it hosts the world's most spectacular wildlife migration. Every year, over 1.5 million wildebeest and hundreds of thousands of zebras make their circular journey through the ecosystem. The park is home to the Big Five (lion, leopard, elephant, buffalo, and rhino) and offers unparalleled game viewing opportunities year-round.",
      image: serengetiImage,
      rating: 4.9,
      reviews: 2847,
      bestTime: "June to October",
      duration: "3-7 days recommended",
      activities: ["Safari Game Drives", "Hot Air Balloon Rides", "Wildlife Photography", "Cultural Tours"],
      highlights: ["Great Migration", "Big Five Sightings", "Serengeti Plains", "Ngorongoro Crater"]
    },
    {
      name: "Cape Town",
      country: "South Africa",
      description: "Where mountains meet the ocean. Explore Table Mountain, pristine beaches, vibrant culture, and world-class wine regions.",
      fullDescription: "Cape Town is a stunning coastal city nestled between the iconic Table Mountain and the Atlantic Ocean. Known as the Mother City, it offers a perfect blend of natural beauty, rich history, and vibrant culture. From the historic Robben Island to the colorful Bo-Kaap neighborhood, pristine beaches of Camps Bay to the renowned wine estates of Stellenbosch, Cape Town provides diverse experiences for every traveler.",
      image: capetownImage,
      rating: 4.8,
      reviews: 3921,
      bestTime: "November to March",
      duration: "4-7 days recommended",
      activities: ["Table Mountain Hike", "Wine Tasting Tours", "Beach Activities", "Robben Island Visit"],
      highlights: ["Table Mountain", "Cape of Good Hope", "V&A Waterfront", "Wine Estates"]
    },
    {
      name: "Pyramids of Giza",
      country: "Egypt",
      description: "Ancient wonders that have stood the test of time. Explore the last remaining Wonder of the Ancient World and the mysterious Sphinx.",
      fullDescription: "The Pyramids of Giza are among the most iconic monuments in the world, built over 4,500 years ago. These magnificent structures include the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure, along with the enigmatic Great Sphinx. Standing at the edge of the Sahara Desert, these ancient wonders continue to fascinate visitors with their architectural precision and historical significance.",
      image: egyptImage,
      rating: 4.7,
      reviews: 5124,
      bestTime: "October to April",
      duration: "2-4 days recommended",
      activities: ["Pyramid Tours", "Sphinx Exploration", "Camel Rides", "Egyptian Museum Visit"],
      highlights: ["Great Pyramid", "The Sphinx", "Sound & Light Show", "Solar Boat Museum"]
    },
  ];

  const destination = destinations.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "-") === name?.toLowerCase()
  );

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground mb-8">The destination you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/destinations")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate("/destinations")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>

          {/* Hero Image */}
          <div className="relative h-[60vh] rounded-xl overflow-hidden mb-8 animate-fade-in">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-overlay opacity-40" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{destination.country}</span>
              </div>
              <h1 className="text-5xl font-bold">{destination.name}</h1>
            </div>
            <div className="absolute top-8 right-8 bg-card px-4 py-2 rounded-full flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-lg font-semibold">{destination.rating}</span>
              <span className="text-muted-foreground">({destination.reviews} reviews)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card className="p-6 shadow-card animate-fade-in">
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.fullDescription}
                </p>
              </Card>

              {/* Highlights */}
              <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h2 className="text-3xl font-bold mb-4">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20"
                    >
                      <Star className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Activities */}
              <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "200ms" }}>
                <h2 className="text-3xl font-bold mb-4">Activities</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary transition-colors"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="p-6 shadow-card animate-fade-in sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Trip Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Best Time to Visit</p>
                      <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Recommended Duration</p>
                      <p className="text-sm text-muted-foreground">{destination.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Travelers</p>
                      <p className="text-sm text-muted-foreground">{destination.reviews}+ visited</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" size="lg">
                  Plan Your Trip
                </Button>
                <Button variant="outline" className="w-full mt-2">
                  View Accommodations
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
