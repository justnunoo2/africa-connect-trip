import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import AddVehicleDialog from "@/components/AddVehicleDialog";

const TransportDashboardContent = () => {
  const navigate = useNavigate();
  const { loading, hasRole, user } = useAuth();
  const { vehicles, rides, stats, deleteVehicle } = useTransportDashboard();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasRole("transport")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/transport", icon: LayoutDashboard },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Transport Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
          <TabsTrigger value="rides">Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>My Fleet</CardTitle>
                <CardDescription>Your vehicle fleet overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.slice(0, 3).map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{vehicle.name}</h4>
                        <p className="text-sm text-muted-foreground">{vehicle.type} • {vehicle.capacity} seats</p>
                      </div>
                      <Badge variant={vehicle.status === "Available" ? "secondary" : "outline"}>
                        {vehicle.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rides</CardTitle>
                <CardDescription>Your scheduled transport bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rides.slice(0, 3).map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{ride.route}</h4>
                        <p className="text-sm text-muted-foreground">{ride.date} • {ride.passengers} passengers</p>
                      </div>
                      <p className="font-semibold">{ride.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Vehicles</CardTitle>
                  <CardDescription>Manage your transport fleet</CardDescription>
                </div>
                <Button onClick={() => setAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                      <Button variant="ghost" size="sm" onClick={() => deleteVehicle(vehicle.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <AddVehicleDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
        </TabsContent>

        {/* Rides Tab */}
        <TabsContent value="rides">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>View and manage your ride bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{ride.route}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{ride.vehicle}</p>
                      <p className="text-sm text-muted-foreground">{ride.date} • {ride.passengers} passengers</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={ride.status === "Confirmed" ? "secondary" : "outline"}>
                        {ride.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">{ride.revenue}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Transport Provider Profile</CardTitle>
              <CardDescription>Manage your transport business profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+254 700 000 000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Quick Transport Services" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Operating License Number</Label>
                <Input id="license" placeholder="TRN-12345-2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routes">Primary Routes</Label>
                <Input id="routes" placeholder="Nairobi - Mombasa, Cape Town - Garden Route" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

const TransportDashboard = () => (
  <TransportDashboardProvider>
    <TransportDashboardContent />
  </TransportDashboardProvider>
);

export default TransportDashboard;