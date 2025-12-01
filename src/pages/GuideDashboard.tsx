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
  Package,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GuideDashboardProvider, useGuideDashboard } from "@/contexts/GuideDashboardContext";
import AddExperienceDialog from "@/components/AddExperienceDialog";

const GuideDashboardContent = () => {
  const navigate = useNavigate();
  const { loading, hasRole, user } = useAuth();
  const { experiences, bookings, stats, deleteExperience } = useGuideDashboard();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasRole("guide")) {
    navigate("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard/guide", icon: LayoutDashboard },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Guide Dashboard">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experiences">My Experiences</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Experiences</CardTitle>
                <CardDescription>Your latest experience listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experiences.slice(0, 3).map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{exp.name}</h4>
                        <p className="text-sm text-muted-foreground">{exp.bookings} bookings • {exp.price}</p>
                      </div>
                      <Badge variant="secondary">{exp.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{booking.experience}</h4>
                        <p className="text-sm text-muted-foreground">{booking.date} • {booking.guests} guests</p>
                      </div>
                      <p className="font-semibold">{booking.revenue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Experiences Tab */}
        <TabsContent value="experiences">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Experiences</CardTitle>
                  <CardDescription>Manage your experience listings</CardDescription>
                </div>
                <Button onClick={() => setAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                      <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <AddExperienceDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>View and manage your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{booking.experience}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.date} • {booking.guests} guests
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={booking.status === "Confirmed" ? "secondary" : "outline"}>
                        {booking.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">{booking.revenue}</p>
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
              <CardTitle>Guide Profile</CardTitle>
              <CardDescription>Manage your professional profile</CardDescription>
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
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" placeholder="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell tourists about yourself..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Input id="languages" placeholder="English, Swahili, French" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

const GuideDashboard = () => (
  <GuideDashboardProvider>
    <GuideDashboardContent />
  </GuideDashboardProvider>
);

export default GuideDashboard;