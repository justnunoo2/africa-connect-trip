import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Calendar,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { HostDashboardProvider, useHostDashboard } from "@/contexts/HostDashboardContext";
import { AddAccommodationDialog } from "@/components/AddAccommodationDialog";

const DashboardContent = () => {
  const { accommodations, bookings, deleteAccommodation } = useHostDashboard();
  
  const stats = {
    totalProperties: accommodations.length,
    activeBookings: bookings.length,
    monthlyRevenue: "$8,450",
    occupancyRate: "78%",
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="properties">My Properties</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
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
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <span className="text-lg">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupancyRate}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Properties</CardTitle>
              <CardDescription>Your latest listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accommodations.slice(0, 3).map((acc) => (
                  <div key={acc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{acc.name}</h4>
                      <p className="text-sm text-muted-foreground">{acc.type}</p>
                    </div>
                    <Badge variant="secondary">{acc.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{booking.property}</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.checkIn} → {booking.checkOut}
                      </p>
                    </div>
                    <p className="font-semibold">{booking.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="properties">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Properties</CardTitle>
              <AddAccommodationDialog />
            </div>
            <CardDescription>Manage your accommodation listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accommodations.map((acc) => (
                <div key={acc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{acc.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{acc.type}</span>
                      <span>${acc.price}/night</span>
                      <span>{acc.bookings} bookings</span>
                      <span>{acc.occupancy} occupied</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{acc.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteAccommodation(acc.id)}>
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
            <CardDescription>Manage property reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{booking.property}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.checkIn} → {booking.checkOut}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{booking.revenue}</p>
                    <Button variant="outline" size="sm">Manage</Button>
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
            <CardDescription>Manage your host profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const HostDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("host")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/host", icon: Home },
  ];

  return (
    <HostDashboardProvider>
      <DashboardLayout navItems={navItems} title="Host Dashboard">
        <DashboardContent />
      </DashboardLayout>
    </HostDashboardProvider>
  );
};

export default HostDashboard;
