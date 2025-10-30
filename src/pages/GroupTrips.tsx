import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";

const GroupTrips = () => {
  const trips = [
    {
      destination: "East African Highlights",
      countries: "Kenya & Tanzania",
      dates: "Mar 15-28, 2025",
      duration: "14 days",
      budget: "$2,800",
      spotsAvailable: 4,
      totalSpots: 12,
      highlights: ["Safari", "Cultural visits", "Beach relaxation"],
    },
    {
      destination: "West African Heritage",
      countries: "Ghana & Senegal",
      dates: "Apr 5-18, 2025",
      duration: "14 days",
      budget: "$2,400",
      spotsAvailable: 7,
      totalSpots: 15,
      highlights: ["Historical sites", "Local cuisine", "Music & dance"],
    },
    {
      destination: "Southern Africa Explorer",
      countries: "South Africa & Botswana",
      dates: "May 10-24, 2025",
      duration: "15 days",
      budget: "$3,200",
      spotsAvailable: 2,
      totalSpots: 10,
      highlights: ["Victoria Falls", "Wine tasting", "Wildlife safaris"],
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
              Join a <span className="bg-gradient-hero bg-clip-text text-transparent">Group Trip</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Travel with like-minded adventurers. Share experiences, split costs, and make lifelong friends.
            </p>
            <Button variant="accent" size="lg">
              Create Your Own Trip
            </Button>
          </div>

          {/* Trips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {trips.map((trip, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{trip.destination}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.countries}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Available spots</div>
                    <div className="text-2xl font-bold text-primary">
                      {trip.spotsAvailable}/{trip.totalSpots}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">Dates</div>
                      <div className="font-medium">{trip.dates}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                      <div className="font-medium">{trip.budget}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Trip Highlights:</div>
                  <div className="flex gap-2 flex-wrap">
                    {trip.highlights.map((highlight, i) => (
                      <span key={i} className="bg-secondary px-3 py-1 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">View Details</Button>
                  <Button variant="outline" className="flex-1">Join Trip</Button>
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

export default GroupTrips;
