import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CreateTripDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTripCreated: () => void;
}

const CreateTripDialog = ({ open, onOpenChange, onTripCreated }: CreateTripDialogProps) => {
  const [destination, setDestination] = useState("");
  const [countries, setCountries] = useState("");
  const [dates, setDates] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [totalSpots, setTotalSpots] = useState("");
  const [highlights, setHighlights] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const highlightsArray = highlights.split(",").map((h) => h.trim()).filter(Boolean);

    const { error } = await supabase.from("group_trips").insert({
      destination,
      countries,
      dates,
      duration,
      budget: parseFloat(budget),
      spots_available: parseInt(totalSpots),
      total_spots: parseInt(totalSpots),
      highlights: highlightsArray,
      description,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Failed to create trip",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Trip created!",
        description: "Your group trip has been created successfully.",
      });
      onOpenChange(false);
      onTripCreated();
      // Reset form
      setDestination("");
      setCountries("");
      setDates("");
      setDuration("");
      setBudget("");
      setTotalSpots("");
      setHighlights("");
      setDescription("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Own Trip</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new group trip
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination Name</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., East African Adventure"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="countries">Countries</Label>
            <Input
              id="countries"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              placeholder="e.g., Kenya & Tanzania"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dates">Dates</Label>
              <Input
                id="dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g., Mar 15-28, 2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 14 days"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="2800"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spots">Total Spots</Label>
              <Input
                id="spots"
                type="number"
                value={totalSpots}
                onChange={(e) => setTotalSpots(e.target.value)}
                placeholder="12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">Highlights (comma-separated)</Label>
            <Input
              id="highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="Safari, Cultural visits, Beach relaxation"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your trip..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Creating..." : "Create Trip"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripDialog;