import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Discover Africa's
          <span className="block bg-gradient-accent bg-clip-text text-transparent">
            Hidden Gems
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in">
          Destinations, stays, and local experiences all in one place. Your African adventure starts here.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 bg-card/95 backdrop-blur-md p-4 rounded-2xl shadow-elevated">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations, activities, or experiences..."
                className="pl-12 h-14 border-0 bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="hero" size="lg" className="h-14 px-8">
              Search
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button variant="hero" size="lg">
            Find a Destination
          </Button>
          <Button variant="accent" size="lg">
            Join a Group Trip
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-foreground backdrop-blur-sm">
            Host an Experience
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
