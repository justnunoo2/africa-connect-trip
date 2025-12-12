import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, MapPin, Star, Clock, Users, Car, Calendar } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image_url: string;
  rating: number | null;
}

interface Accommodation {
  id: string;
  name: string;
  type: string;
  price_per_night: number;
  image_url: string;
  rating: number | null;
}

interface Experience {
  id: string;
  name: string;
  location: string;
  price: number;
  duration: string;
  image_url: string;
  rating: number | null;
}

interface Transport {
  id: string;
  vehicle_type: string | null;
  vehicle_model: string | null;
  capacity: number | null;
  routes: string[] | null;
}

interface GroupTrip {
  id: string;
  destination: string;
  dates: string;
  duration: string;
  budget: number;
  spots_available: number;
}

// Mock events data (since no events table exists yet)
const mockEvents = [
  { id: "1", title: "Serengeti Wildlife Festival", date: "March 15-20, 2024", location: "Tanzania", type: "upcoming" },
  { id: "2", title: "Cape Town Jazz Festival", date: "April 5-7, 2024", location: "South Africa", type: "upcoming" },
  { id: "3", title: "Marrakech Food Festival", date: "May 10-12, 2024", location: "Morocco", type: "upcoming" },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [groupTrips, setGroupTrips] = useState<GroupTrip[]>([]);
  const [events, setEvents] = useState(mockEvents);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    const term = `%${searchTerm.toLowerCase()}%`;

    try {
      const [destRes, accRes, expRes, transRes, tripRes] = await Promise.all([
        supabase.from("destinations").select("*").or(`name.ilike.${term},country.ilike.${term},description.ilike.${term}`),
        supabase.from("accommodations").select("*").or(`name.ilike.${term},type.ilike.${term}`),
        supabase.from("experiences").select("*").or(`name.ilike.${term},location.ilike.${term}`),
        supabase.from("transport_profiles").select("*").or(`vehicle_type.ilike.${term},vehicle_model.ilike.${term}`),
        supabase.from("group_trips").select("*").or(`destination.ilike.${term},countries.ilike.${term}`),
      ]);

      setDestinations(destRes.data || []);
      setAccommodations(accRes.data || []);
      setExperiences(expRes.data || []);
      setTransports(transRes.data || []);
      setGroupTrips(tripRes.data || []);
      setEvents(mockEvents.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    performSearch(query);
  };

  const totalResults = destinations.length + accommodations.length + experiences.length + transports.length + groupTrips.length + events.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Search Results</h1>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, experiences, accommodations..."
                  className="pl-12 h-12"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Search
              </Button>
            </form>
            {searchQuery && (
              <p className="mt-4 text-muted-foreground">
                {loading ? "Searching..." : `Found ${totalResults} results for "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* Results Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-7 mb-8">
              <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
              <TabsTrigger value="destinations">Destinations ({destinations.length})</TabsTrigger>
              <TabsTrigger value="accommodations">Stays ({accommodations.length})</TabsTrigger>
              <TabsTrigger value="experiences">Experiences ({experiences.length})</TabsTrigger>
              <TabsTrigger value="transport">Transport ({transports.length})</TabsTrigger>
              <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
              <TabsTrigger value="trips">Group Trips ({groupTrips.length})</TabsTrigger>
            </TabsList>

            {/* All Results */}
            <TabsContent value="all" className="space-y-8">
              {destinations.length > 0 && (
                <ResultSection title="Destinations" onViewAll={() => setActiveTab("destinations")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {destinations.slice(0, 3).map((dest) => (
                      <Card key={dest.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/destinations/${dest.name}`)}>
                        <img src={dest.image_url} alt={dest.name} className="w-full h-40 object-cover rounded-t-lg" />
                        <CardContent className="p-4">
                          <div className="flex items-center gap-1 mb-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{dest.country}</span>
                          </div>
                          <h3 className="font-semibold text-foreground">{dest.name}</h3>
                          {dest.rating && <div className="flex items-center gap-1 mt-2"><Star className="h-4 w-4 text-accent fill-accent" /><span className="text-sm">{dest.rating}</span></div>}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {accommodations.length > 0 && (
                <ResultSection title="Accommodations" onViewAll={() => setActiveTab("accommodations")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {accommodations.slice(0, 3).map((acc) => (
                      <Card key={acc.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/accommodations/${acc.id}`)}>
                        <img src={acc.image_url} alt={acc.name} className="w-full h-40 object-cover rounded-t-lg" />
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">{acc.type}</Badge>
                          <h3 className="font-semibold text-foreground">{acc.name}</h3>
                          <p className="text-primary font-bold mt-2">${acc.price_per_night}/night</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {experiences.length > 0 && (
                <ResultSection title="Experiences" onViewAll={() => setActiveTab("experiences")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {experiences.slice(0, 3).map((exp) => (
                      <Card key={exp.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/experiences/${exp.id}`)}>
                        <img src={exp.image_url} alt={exp.name} className="w-full h-40 object-cover rounded-t-lg" />
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{exp.duration}</span>
                          </div>
                          <h3 className="font-semibold text-foreground">{exp.name}</h3>
                          <p className="text-primary font-bold mt-2">${exp.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {transports.length > 0 && (
                <ResultSection title="Transport" onViewAll={() => setActiveTab("transport")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {transports.slice(0, 3).map((t) => (
                      <Card key={t.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <Car className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold text-foreground">{t.vehicle_model || "Vehicle"}</h3>
                            <p className="text-sm text-muted-foreground">{t.vehicle_type} • {t.capacity} seats</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {events.length > 0 && (
                <ResultSection title="Events" onViewAll={() => setActiveTab("events")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {events.slice(0, 3).map((event) => (
                      <Card key={event.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="font-semibold text-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {groupTrips.length > 0 && (
                <ResultSection title="Group Trips" onViewAll={() => setActiveTab("trips")}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {groupTrips.slice(0, 3).map((trip) => (
                      <Card key={trip.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/group-trips/${trip.id}`)}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{trip.spots_available} spots left</span>
                          </div>
                          <h3 className="font-semibold text-foreground">{trip.destination}</h3>
                          <p className="text-sm text-muted-foreground">{trip.dates} • {trip.duration}</p>
                          <p className="text-primary font-bold mt-2">${trip.budget}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ResultSection>
              )}

              {totalResults === 0 && !loading && searchQuery && (
                <div className="text-center py-16">
                  <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-foreground mb-2">No results found</h2>
                  <p className="text-muted-foreground">Try adjusting your search terms or browse our categories</p>
                </div>
              )}
            </TabsContent>

            {/* Individual Tab Contents */}
            <TabsContent value="destinations">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <Card key={dest.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/destinations/${dest.name}`)}>
                    <img src={dest.image_url} alt={dest.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{dest.country}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{dest.name}</h3>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{dest.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accommodations">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accommodations.map((acc) => (
                  <Card key={acc.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/accommodations/${acc.id}`)}>
                    <img src={acc.image_url} alt={acc.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{acc.type}</Badge>
                      <h3 className="font-semibold text-foreground text-lg">{acc.name}</h3>
                      <p className="text-primary font-bold mt-2">${acc.price_per_night}/night</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experiences">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                  <Card key={exp.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/experiences/${exp.id}`)}>
                    <img src={exp.image_url} alt={exp.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{exp.location}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{exp.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">{exp.duration}</span>
                        <p className="text-primary font-bold">${exp.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transport">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transports.map((t) => (
                  <Card key={t.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <Car className="h-12 w-12 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{t.vehicle_model || "Vehicle"}</h3>
                        <p className="text-muted-foreground">{t.vehicle_type}</p>
                        <p className="text-sm text-muted-foreground">{t.capacity} seats</p>
                      </div>
                    </div>
                    {t.routes && t.routes.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.routes.slice(0, 3).map((route, idx) => (
                          <Badge key={idx} variant="outline">{route}</Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-12 w-12 text-primary" />
                      <div>
                        <Badge variant={event.type === "upcoming" ? "default" : "secondary"} className="mb-2">
                          {event.type}
                        </Badge>
                        <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                        <p className="text-muted-foreground">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trips">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {groupTrips.map((trip) => (
                  <Card key={trip.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate(`/group-trips/${trip.id}`)}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{trip.spots_available} spots left</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-xl">{trip.destination}</h3>
                      <p className="text-muted-foreground mt-2">{trip.dates}</p>
                      <p className="text-sm text-muted-foreground">{trip.duration}</p>
                      <p className="text-primary font-bold text-xl mt-4">From ${trip.budget}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ResultSection = ({ title, children, onViewAll }: { title: string; children: React.ReactNode; onViewAll: () => void }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <Button variant="link" onClick={onViewAll}>View all</Button>
    </div>
    {children}
  </div>
);

export default Search;
