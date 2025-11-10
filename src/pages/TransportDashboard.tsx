import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  Edit,
  Trash2,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { TransportDashboardProvider, useTransportDashboard } from "@/contexts/TransportDashboardContext";
import { AddVehicleDialog } from "@/components/AddVehicleDialog";

const DashboardContent = () => {
  const { vehicles, rides, deleteVehicle } = useTransportDashboard();
  
  const stats = {
    totalVehicles: vehicles.length,
    activeRides: rides.length,
    totalEarnings: "$3,280",
    completedRides: 142,
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Stats Grid */}
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Vehicles */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Vehicles</CardTitle>
              <CardDescription>Your fleet overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.slice(0, 3).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{vehicle.name}</h4>
                      <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                    </div>
                    <Badge variant={vehicle.status === "Available" ? "secondary" : "outline"}>
                      {vehicle.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Rides */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
              <CardDescription>Scheduled transport bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rides.slice(0, 3).map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{ride.route}</h4>
                      <p className="text-sm text-muted-foreground">
                        {ride.date} • {ride.passengers} passengers
                      </p>
                    </div>
                    <p className="font-semibold">{ride.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="vehicles">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Vehicles</CardTitle>
              <AddVehicleDialog />
            </div>
            <CardDescription>Manage your transport fleet</CardDescription>
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
      </TabsContent>

      <TabsContent value="bookings">
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage transport bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{ride.route}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{ride.vehicle}</p>
                    <p className="text-sm text-muted-foreground">
                      {ride.date} • {ride.passengers} passengers
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{ride.revenue}</p>
                    <Button variant="outline" size="sm">View Details</Button>
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
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
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

  const navItems = [
    { name: "Dashboard", path: "/dashboard/transport", icon: Car },
  ];

  return (
    <TransportDashboardProvider>
      <DashboardLayout navItems={navItems} title="Transport Dashboard">
        <DashboardContent />
      </DashboardLayout>
    </TransportDashboardProvider>
  );
};

export default TransportDashboard;
