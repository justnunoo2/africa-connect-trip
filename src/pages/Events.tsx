import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Serengeti Wildlife Festival",
      date: "2024-12-15",
      location: "Serengeti National Park, Tanzania",
      description: "Experience the great migration and wildlife photography workshops with expert guides.",
      attendees: 120,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      category: "Festival",
      time: "8:00 AM - 6:00 PM",
    },
    {
      id: 2,
      title: "Cape Town Jazz Festival",
      date: "2024-12-20",
      location: "Cape Town, South Africa",
      description: "Africa's grandest gathering celebrating the very best of African and international jazz.",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
      category: "Music",
      time: "5:00 PM - 11:00 PM",
    },
    {
      id: 3,
      title: "Maasai Cultural Experience",
      date: "2025-01-10",
      location: "Maasai Mara, Kenya",
      description: "Immerse yourself in traditional Maasai culture, dances, and customs.",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800",
      category: "Cultural",
      time: "9:00 AM - 4:00 PM",
    },
    {
      id: 4,
      title: "Victoria Falls Adventure Week",
      date: "2025-02-05",
      location: "Victoria Falls, Zimbabwe",
      description: "A week of bungee jumping, white water rafting, and helicopter tours over the falls.",
      attendees: 80,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      category: "Adventure",
      time: "All Day Event",
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Zanzibar Spice Festival",
      date: "2024-09-20",
      location: "Stone Town, Zanzibar",
      description: "A culinary journey through the spice islands with cooking workshops and tastings.",
      attendees: 200,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
      category: "Food & Culture",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 6,
      title: "Egyptian Heritage Tour",
      date: "2024-08-15",
      location: "Cairo & Luxor, Egypt",
      description: "Explore ancient pyramids, temples, and the Valley of the Kings with expert Egyptologists.",
      attendees: 60,
      image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800",
      category: "Historical",
      time: "7:00 AM - 5:00 PM",
    },
    {
      id: 7,
      title: "Marrakech Desert Camp",
      date: "2024-07-10",
      location: "Sahara Desert, Morocco",
      description: "Camel treks, stargazing, and traditional Berber camping experience.",
      attendees: 35,
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800",
      category: "Adventure",
      time: "3:00 PM - Next Day 10:00 AM",
    },
  ];

  const EventCard = ({ event, isPast = false }: { event: typeof upcomingEvents[0]; isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover ${isPast ? "grayscale" : ""}`}
        />
        <Badge className="absolute top-3 right-3">{event.category}</Badge>
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">Past Event</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.attendees} {isPast ? "attended" : "attending"}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {!isPast ? (
            <>
              <Button className="flex-1">Register Now</Button>
              <Button variant="outline">Learn More</Button>
            </>
          ) : (
            <Button variant="outline" className="w-full">View Gallery</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              African Events & Experiences
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover festivals, cultural celebrations, and unique experiences across the African continent
            </p>
          </div>
        </section>

        {/* Events Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;