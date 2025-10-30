import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
}

const DestinationCard = ({ name, country, description, image, rating, reviews }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer shadow-card hover:shadow-elevated transition-all duration-300 border-0 animate-fade-in">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute top-4 right-4 bg-card px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{country}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <Button variant="outline" className="w-full group-hover:border-primary">
          Explore Destination
        </Button>
      </div>
    </Card>
  );
};

export default DestinationCard;
