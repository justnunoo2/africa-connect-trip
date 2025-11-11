import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Transport {
  id: string;
  vehicle_type: string;
  vehicle_model: string;
  capacity: number;
}

interface BookTransportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transport: Transport;
}

const BookTransportDialog = ({ open, onOpenChange, transport }: BookTransportDialogProps) => {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [booking, setBooking] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBooking(true);

    // Simulate booking
    setTimeout(() => {
      toast({
        title: "Booking Successful!",
        description: "Your transport has been booked. Check your email for details.",
      });
      setBooking(false);
      onOpenChange(false);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setPickupLocation("");
      setDropoffLocation("");
      setPassengers(1);
      setPickupDate(undefined);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Transport</DialogTitle>
          <DialogDescription>
            {transport.vehicle_model} - Capacity: {transport.capacity} passengers
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBooking} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !pickupDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input
              id="pickup"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Enter pickup address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff">Drop-off Location</Label>
            <Input
              id="dropoff"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Enter drop-off address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <Input
              id="passengers"
              type="number"
              min={1}
              max={transport.capacity}
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
              required
            />
            <p className="text-xs text-muted-foreground">
              Maximum capacity: {transport.capacity} passengers
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={booking || !pickupDate}>
              {booking ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookTransportDialog;
