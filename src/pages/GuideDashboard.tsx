import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Package,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const GuideDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  // Mock data
  const stats = {
    totalExperiences: 12,
    activeBookings: 8,
    totalEarnings: "$4,850",
    averageRating: 4.8,
  };

  const experiences = [
    {
      id: 1,
      name: "Safari Adventure in Serengeti",
      bookings: 15,
      rating: 4.9,
      price: "$250",
      status: "Active",
    },
    {
      id: 2,
      name: "Mountain Hiking Experience",
      bookings: 8,
      rating: 4.7,
      price: "$180",
      status: "Active",
    },
    {
      id: 3,
      name: "Cultural Village Tour",
      bookings: 12,
      rating: 4.8,
      price: "$120",
      status: "Active",
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      experience: "Safari Adventure",
      date: "2024-11-15",
      guests: 4,
      revenue: "$1,000",
    },
    {
      id: 2,
      experience: "Mountain Hiking",
      date: "2024-11-18",
      guests: 2,
      revenue: "$360",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("guide")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/guide", icon: LayoutDashboard },
    { name: "My Experiences", path: "/dashboard/guide/experiences", icon: Package },
    { name: "Bookings", path: "/dashboard/guide/bookings", icon: Calendar },
    { name: "Profile", path: "/dashboard/guide/profile", icon: User },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Guide Dashboard">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Experiences</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalExperiences}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBookings}</div>
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
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Experiences */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Experiences</CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
            <CardDescription>Manage your experience listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{exp.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{exp.bookings} bookings</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {exp.rating}
                      </span>
                      <span>{exp.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{exp.status}</Badge>
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

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{booking.experience}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {booking.date} • {booking.guests} guests
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{booking.revenue}</p>
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

export default GuideDashboard;
