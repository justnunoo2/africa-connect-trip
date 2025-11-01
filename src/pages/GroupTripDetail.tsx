import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Users, DollarSign, MapPin, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
  description: string;
  itinerary: any;
}

const GroupTripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("group_trips")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching trip:", error);
        toast({
          title: "Error",
          description: "Failed to load trip details",
          variant: "destructive",
        });
      } else {
        setTrip(data);
      }
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  const handleJoinTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoining(true);

    const { error } = await supabase.from("trip_members").insert({
      trip_id: id,
      user_email: email,
      user_name: name,
    });

    if (error) {
      toast({
        title: "Failed to join trip",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Update spots available
      if (trip) {
        await supabase
          .from("group_trips")
          .update({ spots_available: trip.spots_available - 1 })
          .eq("id", id);
      }

      toast({
        title: "Successfully joined!",
        description: "You've been added to this group trip. Check your email for details.",
      });
      setJoinDialogOpen(false);
      setName("");
      setEmail("");
      
      // Refresh trip data
      const { data } = await supabase
        .from("group_trips")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setTrip(data);
    }

    setJoining(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl mb-4">Trip not found</p>
          <Button onClick={() => navigate("/group-trips")}>Back to Group Trips</Button>
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
            onClick={() => navigate("/group-trips")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Trips
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{trip.destination}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xl">{trip.countries}</span>
                </div>
              </div>

              {trip.description && (
                <Card className="p-6 border-0 shadow-card">
                  <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                  <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
                </Card>
              )}

              <Card className="p-6 border-0 shadow-card">
                <h2 className="text-2xl font-bold mb-4">Trip Highlights</h2>
                <div className="flex gap-2 flex-wrap">
                  {trip.highlights.map((highlight, i) => (
                    <span key={i} className="bg-secondary px-4 py-2 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </Card>

              {trip.itinerary && (
                <Card className="p-6 border-0 shadow-card">
                  <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                  <div className="space-y-3">
                    {Object.entries(trip.itinerary).map(([day, activity]) => (
                      <div key={day} className="flex gap-3">
                        <div className="font-semibold min-w-[100px] text-primary">
                          {day.replace(/([A-Z])/g, ' $1').trim()}:
                        </div>
                        <div className="text-muted-foreground">{activity as string}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 shadow-elevated sticky top-24">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <span className="text-sm text-muted-foreground">Price per person</span>
                    <span className="text-3xl font-bold">${trip.budget}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Dates</div>
                        <div className="font-medium">{trip.dates}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="font-medium">{trip.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs text-muted-foreground">Spots Available</div>
                        <div className="font-medium">{trip.spots_available} / {trip.total_spots}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={() => setJoinDialogOpen(true)}
                    disabled={trip.spots_available === 0}
                  >
                    {trip.spots_available === 0 ? "Trip Full" : "Join This Trip"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Join Trip Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {trip.destination}</DialogTitle>
            <DialogDescription>
              Fill in your details to join this group trip
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleJoinTrip} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold mb-2">
                <span>Total Price</span>
                <span>${trip.budget}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Payment details will be sent to your email
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setJoinDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={joining}>
                {joining ? "Joining..." : "Confirm"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GroupTripDetail;