import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const TransportDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  // Mock data
  const stats = {
    totalVehicles: 3,
    activeRides: 6,
    totalEarnings: "$3,280",
    completedRides: 142,
  };

  const vehicles = [
    {
      id: 1,
      name: "Toyota Land Cruiser",
      type: "SUV",
      capacity: 7,
      rides: 58,
      status: "Available",
    },
    {
      id: 2,
      name: "Mercedes Sprinter Van",
      type: "Van",
      capacity: 12,
      rides: 45,
      status: "Available",
    },
    {
      id: 3,
      name: "Toyota Hilux",
      type: "Pickup",
      capacity: 5,
      rides: 39,
      status: "In Service",
    },
  ];

  const upcomingRides = [
    {
      id: 1,
      route: "Nairobi → Mombasa",
      vehicle: "Land Cruiser",
      date: "2024-11-16",
      passengers: 5,
      revenue: "$450",
    },
    {
      id: 2,
      route: "Cape Town → Garden Route",
      vehicle: "Sprinter Van",
      date: "2024-11-17",
      passengers: 8,
      revenue: "$680",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("transport")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/transport", icon: LayoutDashboard },
    { name: "My Vehicles", path: "/dashboard/transport/vehicles", icon: Car },
    { name: "Bookings", path: "/dashboard/transport/bookings", icon: Calendar },
    { name: "Profile", path: "/dashboard/transport/profile", icon: User },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Transport Dashboard">
      {/* Stats Grid */}
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
        {/* My Vehicles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Vehicles</CardTitle>
              <Button size="sm">
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
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Rides */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Rides</CardTitle>
            <CardDescription>Your scheduled transport bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRides.map((ride) => (
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
      </div>
    </DashboardLayout>
  );
};

export default TransportDashboard;
