import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHostDashboard } from "@/contexts/HostDashboardContext";
import { toast } from "sonner";

interface AddAccommodationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddAccommodationDialog = ({ open, onOpenChange }: AddAccommodationDialogProps) => {
  const { addAccommodation } = useHostDashboard();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
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

    toast.success("Accommodation added successfully!");
    onOpenChange(false);
    setFormData({
      name: "",
      price: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Accommodation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price per Night ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
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
