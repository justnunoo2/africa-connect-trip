import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Star,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { GuideDashboardProvider, useGuideDashboard } from "@/contexts/GuideDashboardContext";
import { AddExperienceDialog } from "@/components/AddExperienceDialog";
import { toast } from "sonner";

const GuideDashboardContent = () => {
  const { experiences, bookings, deleteExperience } = useGuideDashboard();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const stats = {
    totalExperiences: experiences.length,
    activeBookings: bookings.length,
    totalEarnings: "$4,850",
    averageRating: 4.8,
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteExperience(id);
      toast.success("Experience deleted successfully");
    }
  };

  return (
    <>
      <AddExperienceDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="experiences">
            <Package className="mr-2 h-4 w-4" />
            My Experiences
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
        </TabsContent>

        <TabsContent value="experiences">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Experiences</CardTitle>
                <Button size="sm" onClick={() => setAddDialogOpen(true)}>
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(exp.id, exp.name)}
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
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
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
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your guide profile</CardDescription>
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

  return (
    <GuideDashboardProvider>
      <DashboardLayout navItems={[]} title="Guide Dashboard">
        <GuideDashboardContent />
      </DashboardLayout>
    </GuideDashboardProvider>
  );
};

export default GuideDashboard;
