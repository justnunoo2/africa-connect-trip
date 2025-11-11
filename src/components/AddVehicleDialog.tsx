import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransportDashboard } from "@/contexts/TransportDashboardContext";
import { toast } from "sonner";

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddVehicleDialog = ({ open, onOpenChange }: AddVehicleDialogProps) => {
  const { addVehicle } = useTransportDashboard();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addVehicle({
      name: formData.name,
      type: formData.type,
      capacity: parseInt(formData.capacity),
      rides: 0,
      status: "Available",
    });

    toast.success("Vehicle added successfully!");
    onOpenChange(false);
    setFormData({
      name: "",
      type: "",
      capacity: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Vehicle Name</Label>
              <Input
                id="name"
                placeholder="e.g., Toyota Land Cruiser"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Vehicle Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="Pickup">Pickup</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Passenger Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Vehicle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
