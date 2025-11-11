import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useHostDashboard } from "@/contexts/HostDashboardContext";
import { useToast } from "@/hooks/use-toast";

export const AddAccommodationDialog = () => {
  const [open, setOpen] = useState(false);
  const { addAccommodation } = useHostDashboard();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: 0,
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccommodation(formData);
    toast({
      title: "Property added",
      description: "Your new property has been listed successfully.",
    });
    setOpen(false);
    setFormData({ name: "", type: "", price: 0, status: "Active" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Property Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lodge">Lodge</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Guesthouse">Guesthouse</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price per Night ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Property</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
