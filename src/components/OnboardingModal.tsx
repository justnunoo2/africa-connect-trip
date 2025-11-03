import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Hotel, Users, Compass, ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const slides = [
  {
    icon: MapPin,
    title: "Discover Destinations",
    description: "Explore amazing African destinations with detailed guides, ratings, and reviews. Find your perfect travel spot with curated information about each location.",
  },
  {
    icon: Hotel,
    title: "Book Accommodations",
    description: "Browse through verified accommodations filtered by destination. View prices, amenities, and book your perfect stay with transparent pricing and instant confirmation.",
  },
  {
    icon: Compass,
    title: "Experience Activities",
    description: "Book unique local experiences led by verified hosts. From cultural tours to adventure activities, discover authentic African experiences with flexible group sizes.",
  },
  {
    icon: Users,
    title: "Join Group Trips",
    description: "Connect with fellow travelers on organized group trips. Share costs, make friends, and explore Africa together with carefully planned itineraries and expert guides.",
  },
];

const OnboardingModal = ({ open, onOpenChange }: OnboardingModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onOpenChange(false);
      setCurrentSlide(0);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Welcome to TripLink Africa</DialogTitle>
        </DialogHeader>
        
        <div className="py-8 px-4">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-gradient-hero p-6 rounded-full">
              <Icon className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">{currentSlideData.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {currentSlideData.description}
              </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext} className="flex-1">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;