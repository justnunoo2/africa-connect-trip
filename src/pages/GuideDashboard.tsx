import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GuideDashboardProvider, useGuideDashboard } from "@/contexts/GuideDashboardContext";
import { AddExperienceDialog } from "@/components/AddExperienceDialog";

const DashboardContent = () => {
  const { experiences, bookings, deleteExperience } = useGuideDashboard();
  
  const stats = {
    totalExperiences: experiences.length,
    activeBookings: bookings.filter(b => b.status === "Confirmed").length,
    monthlyRevenue: "$12,450",
    completedTours: 127,
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="experiences">My Experiences</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Experiences</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyRevenue}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTours}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Experiences */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Experiences</CardTitle>
              <CardDescription>Your latest tour offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experiences.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{exp.name}</h4>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <Badge>{exp.bookings} bookings</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Next scheduled tours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{booking.experience}</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} • {booking.people} people
                      </p>
                    </div>
                    <Badge variant={booking.status === "Confirmed" ? "secondary" : "outline"}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="experiences">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Experiences</CardTitle>
              <AddExperienceDialog />
            </div>
            <CardDescription>Manage your tour experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{exp.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{exp.location}</span>
                      <span>{exp.duration}</span>
                      <span>${exp.price}/person</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{exp.bookings} bookings</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
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
            <CardDescription>Manage your tour bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{booking.experience}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{booking.client}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} • {booking.people} people
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{booking.revenue}</p>
                    <Badge variant={booking.status === "Confirmed" ? "secondary" : "outline"}>
                      {booking.status}
                    </Badge>
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
            <CardDescription>Manage your guide profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const GuideDashboard = () => {
  const navigate = useNavigate();
  const { loading, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasRole("guide")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/guide", icon: MapPin },
  ];

  return (
    <GuideDashboardProvider>
      <DashboardLayout navItems={navItems} title="Guide Dashboard">
        <DashboardContent />
      </DashboardLayout>
    </GuideDashboardProvider>
  );
};

export default GuideDashboard;
