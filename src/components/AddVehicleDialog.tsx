import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useTransportDashboard } from "@/contexts/TransportDashboardContext";
import { useToast } from "@/hooks/use-toast";

export const AddVehicleDialog = () => {
  const [open, setOpen] = useState(false);
  const { addVehicle } = useTransportDashboard();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: 0,
    status: "Available",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle(formData);
    toast({
      title: "Vehicle added",
      description: "Your new vehicle has been added to the fleet.",
    });
    setOpen(false);
    setFormData({ name: "", type: "", capacity: 0, status: "Available" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Vehicle Name</Label>
            <Input
              id="name"
              placeholder="e.g., Toyota Land Cruiser"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
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
          <div>
            <Label htmlFor="capacity">Passenger Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Vehicle</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
