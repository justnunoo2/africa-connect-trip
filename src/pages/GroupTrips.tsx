import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CreateTripDialog from "@/components/CreateTripDialog";

interface Trip {
  id: string;
  destination: string;
  countries: string;
  dates: string;
  duration: string;
  budget: number;
  spots_available: number;
  total_spots: number;
  highlights: string[];
}

const GroupTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from("group_trips")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching trips:", error);
    } else {
      setTrips(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Loading trips...</p>
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
              Join a <span className="bg-gradient-hero bg-clip-text text-transparent">Group Trip</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Travel with like-minded adventurers. Share experiences, split costs, and make lifelong friends.
            </p>
            <Button variant="accent" size="lg" onClick={() => setCreateDialogOpen(true)}>
              Create Your Own Trip
            </Button>
          </div>

          {/* Trips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {trips.map((trip, index) => (
              <Card key={trip.id} className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
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
                      {trip.spots_available}/{trip.total_spots}
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
                      <div className="font-medium">${trip.budget}</div>
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
                  <Button className="flex-1" onClick={() => navigate(`/group-trips/${trip.id}`)}>
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => navigate(`/group-trips/${trip.id}`)}
                  >
                    Join Trip
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <CreateTripDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTripCreated={fetchTrips}
      />

      <Footer />
    </div>
  );
};

export default GroupTrips;
