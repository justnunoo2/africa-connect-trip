import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Car,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { TransportDashboardProvider, useTransportDashboard } from "@/contexts/TransportDashboardContext";
import { AddVehicleDialog } from "@/components/AddVehicleDialog";
import { toast } from "sonner";

const TransportDashboardContent = () => {
  const { vehicles, rides, deleteVehicle } = useTransportDashboard();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const stats = {
    totalVehicles: vehicles.length,
    activeRides: rides.length,
    totalEarnings: "$3,280",
    completedRides: 142,
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteVehicle(id);
      toast.success("Vehicle deleted successfully");
    }
  };

  return (
    <>
      <AddVehicleDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="vehicles">
            <Car className="mr-2 h-4 w-4" />
            My Vehicles
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVehicles}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rides</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeRides}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <span className="text-lg">💰</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEarnings}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedRides}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Vehicles</CardTitle>
                <Button size="sm" onClick={() => setAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Button>
              </div>
              <CardDescription>Manage your transport fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{vehicle.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{vehicle.type}</span>
                        <span>Capacity: {vehicle.capacity}</span>
                        <span>{vehicle.rides} rides</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={vehicle.status === "Available" ? "secondary" : "outline"}>
                        {vehicle.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(vehicle.id, vehicle.name)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
              <CardDescription>Your scheduled transport bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rides.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">{ride.route}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ride.vehicle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ride.date} • {ride.passengers} passengers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{ride.revenue}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your transport provider profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Profile settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

const TransportDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("transport")) {
    navigate("/");
    return null;
  }

  return (
    <TransportDashboardProvider>
      <DashboardLayout navItems={[]} title="Transport Dashboard">
        <TransportDashboardContent />
      </DashboardLayout>
    </TransportDashboardProvider>
  );
};

export default TransportDashboard;
