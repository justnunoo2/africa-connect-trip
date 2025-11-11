import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users, MapPin, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import BookTransportDialog from "@/components/BookTransportDialog";
import ViewTransportDetailsDialog from "@/components/ViewTransportDetailsDialog";

interface Transport {
  id: string;
  vehicle_type: string;
  vehicle_model: string;
  capacity: number;
  license_plate?: string;
  routes?: string[];
}

const Transport = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    const { data, error } = await supabase
      .from("transport_profiles")
      .select("*");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load transport options",
        variant: "destructive",
      });
    } else {
      setTransports(data || []);
    }
    setLoading(false);
  };

  const handleViewDetails = (transport: Transport) => {
    setSelectedTransport(transport);
    setDetailsDialogOpen(true);
  };

  const handleBookTransport = (transport: Transport) => {
    setSelectedTransport(transport);
    setBookingDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Transport Services
            </h1>
            <p className="text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              Safe and reliable transport options for your African adventure
            </p>
          </div>
        </section>

        {/* Transport Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-xl">Loading transport options...</p>
              </div>
            ) : transports.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">
                  No transport options available at the moment
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back later for available transport services
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transports.map((transport) => (
                  <Card
                    key={transport.id}
                    className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                  >
                    <div className="p-6 space-y-4">
                      {/* Vehicle Info */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold">{transport.vehicle_model}</h3>
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full inline-block">
                          {transport.vehicle_type}
                        </p>
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Capacity: {transport.capacity} passengers</span>
                      </div>

                      {/* Routes */}
                      {transport.routes && transport.routes.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Available Routes</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {transport.routes.slice(0, 2).map((route, index) => (
                              <span
                                key={index}
                                className="text-xs bg-secondary/50 px-2 py-1 rounded"
                              >
                                {route}
                              </span>
                            ))}
                            {transport.routes.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{transport.routes.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewDetails(transport)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleBookTransport(transport)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedTransport && (
        <>
          <BookTransportDialog
            open={bookingDialogOpen}
            onOpenChange={setBookingDialogOpen}
            transport={selectedTransport}
          />
          <ViewTransportDetailsDialog
            open={detailsDialogOpen}
            onOpenChange={setDetailsDialogOpen}
            transport={selectedTransport}
          />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Transport;
