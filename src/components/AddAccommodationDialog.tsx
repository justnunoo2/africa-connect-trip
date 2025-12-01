import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHostDashboard } from "@/contexts/HostDashboardContext";
import { useToast } from "@/hooks/use-toast";

interface AddAccommodationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAccommodationDialog = ({ open, onOpenChange }: AddAccommodationDialogProps) => {
  const { addAccommodation } = useHostDashboard();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccommodation({
      name: formData.name,
      price: `$${formData.price}/night`,
      bookings: 0,
      occupancy: "0%",
      status: "Active",
    });
    toast({
      title: "Property Added",
      description: "Your new property has been listed successfully.",
    });
    setFormData({ name: "", price: "", description: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>List a new accommodation for guests to book.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Luxury Safari Lodge"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Night (USD)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="320"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your property..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Property</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccommodationDialog;