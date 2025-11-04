import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Settings,
  Shield,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  // Mock data
  const stats = {
    totalUsers: 1248,
    totalListings: 342,
    totalBookings: 856,
    totalRevenue: "$124,580",
  };

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Guide",
      status: "Active",
      joined: "2024-11-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Host",
      status: "Pending",
      joined: "2024-11-05",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Transport",
      status: "Active",
      joined: "2024-11-08",
    },
  ];

  const recentListings = [
    {
      id: 1,
      title: "Luxury Safari Lodge",
      type: "Accommodation",
      owner: "Safari Hosts Ltd",
      status: "Active",
    },
    {
      id: 2,
      title: "Mountain Hiking Tour",
      type: "Experience",
      owner: "Adventure Guides",
      status: "Pending Review",
    },
    {
      id: 3,
      title: "Airport Transfer Service",
      type: "Transport",
      owner: "Quick Transport",
      status: "Active",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("admin")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", path: "/dashboard/admin/users", icon: Users },
    { name: "Listings", path: "/dashboard/admin/listings", icon: Package },
    { name: "Bookings", path: "/dashboard/admin/bookings", icon: Calendar },
    { name: "Settings", path: "/dashboard/admin/settings", icon: Settings },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Admin Dashboard">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Users</CardTitle>
              <Button variant="outline" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Manage Roles
              </Button>
            </div>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge variant={user.status === "Active" ? "secondary" : "default"}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{user.joined}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Listings</CardTitle>
              <Button variant="outline" size="sm">
                <AlertCircle className="mr-2 h-4 w-4" />
                Pending Review (2)
              </Button>
            </div>
            <CardDescription>Latest listing submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{listing.title}</h4>
                    <p className="text-sm text-muted-foreground">{listing.owner}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{listing.type}</Badge>
                      <Badge
                        variant={
                          listing.status === "Active"
                            ? "secondary"
                            : listing.status === "Pending Review"
                            ? "default"
                            : "outline"
                        }
                      >
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Review
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

export default AdminDashboard;
