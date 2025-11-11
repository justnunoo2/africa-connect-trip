import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Car, Users, MapPin } from "lucide-react";

interface Transport {
  id: string;
  vehicle_type: string;
  vehicle_model: string;
  capacity: number;
  license_plate?: string;
  routes?: string[];
}

interface ViewTransportDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transport: Transport | null;
}

const ViewTransportDetailsDialog = ({ open, onOpenChange, transport }: ViewTransportDetailsDialogProps) => {
  if (!transport) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Transport Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Car className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Vehicle</p>
                <p className="text-sm text-muted-foreground">{transport.vehicle_model}</p>
                <p className="text-xs text-muted-foreground mt-1">{transport.vehicle_type}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Capacity</p>
                <p className="text-sm text-muted-foreground">{transport.capacity} passengers</p>
              </div>
            </div>

            {transport.license_plate && (
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">License Plate</p>
                  <p className="text-sm text-muted-foreground">{transport.license_plate}</p>
                </div>
              </div>
            )}

            {transport.routes && transport.routes.length > 0 && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-semibold mb-2">Available Routes</p>
                  <div className="flex flex-wrap gap-2">
                    {transport.routes.map((route, index) => (
                      <span
                        key={index}
                        className="bg-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This transport service is provided by a verified transport provider on TripLink Africa.
              All bookings are subject to availability and provider confirmation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransportDetailsDialog;
