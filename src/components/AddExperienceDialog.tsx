import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGuideDashboard } from "@/contexts/GuideDashboardContext";
import { toast } from "sonner";

interface AddExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddExperienceDialog = ({ open, onOpenChange }: AddExperienceDialogProps) => {
  const { addExperience } = useGuideDashboard();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    location: "",
    duration: "",
    maxGroupSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addExperience({
      name: formData.name,
      price: `$${formData.price}`,
      bookings: 0,
      rating: 0,
      status: "Active",
      description: formData.description,
      location: formData.location,
      duration: formData.duration,
      maxGroupSize: parseInt(formData.maxGroupSize),
    });

    toast.success("Experience added successfully!");
    onOpenChange(false);
    setFormData({
      name: "",
      price: "",
      description: "",
      location: "",
      duration: "",
      maxGroupSize: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Experience Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 hours"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  value={formData.maxGroupSize}
                  onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
