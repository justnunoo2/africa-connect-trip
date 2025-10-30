import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import serengetiImage from "@/assets/destination-serengeti.jpg";
import capetownImage from "@/assets/destination-capetown.jpg";
import egyptImage from "@/assets/destination-egypt.jpg";

const Destinations = () => {
  const destinations = [
    {
      name: "Serengeti National Park",
      country: "Tanzania",
      description: "Experience the great migration and witness millions of wildebeest crossing the plains. Home to the Big Five and endless savanna landscapes.",
      image: serengetiImage,
      rating: 4.9,
      reviews: 2847,
    },
    {
      name: "Cape Town",
      country: "South Africa",
      description: "Where mountains meet the ocean. Explore Table Mountain, pristine beaches, vibrant culture, and world-class wine regions.",
      image: capetownImage,
      rating: 4.8,
      reviews: 3921,
    },
    {
      name: "Pyramids of Giza",
      country: "Egypt",
      description: "Ancient wonders that have stood the test of time. Explore the last remaining Wonder of the Ancient World and the mysterious Sphinx.",
      image: egyptImage,
      rating: 4.7,
      reviews: 5124,
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
              Explore <span className="bg-gradient-hero bg-clip-text text-transparent">Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most breathtaking locations across Africa. From wildlife safaris to ancient wonders.
            </p>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Destinations;
