import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

interface Listing {
  id: number;
  title: string;
  type: string;
  owner: string;
  status: string;
}

interface AdminDashboardContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  stats: {
    totalUsers: number;
    totalListings: number;
    totalBookings: number;
    totalRevenue: string;
  };
  updateUserRole: (id: number, role: string) => void;
  updateUserStatus: (id: number, status: string) => void;
  updateListingStatus: (id: number, status: string) => void;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Guide", status: "Active", joined: "2024-11-01" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Host", status: "Pending", joined: "2024-11-05" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Transport", status: "Active", joined: "2024-11-08" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Tourist", status: "Active", joined: "2024-11-10" },
  ]);

  const [listings, setListings] = useState<Listing[]>([
    { id: 1, title: "Luxury Safari Lodge", type: "Accommodation", owner: "Safari Hosts Ltd", status: "Active" },
    { id: 2, title: "Mountain Hiking Tour", type: "Experience", owner: "Adventure Guides", status: "Pending Review" },
    { id: 3, title: "Airport Transfer Service", type: "Transport", owner: "Quick Transport", status: "Active" },
    { id: 4, title: "Desert Safari Experience", type: "Experience", owner: "Desert Tours Co", status: "Pending Review" },
  ]);

  const stats = {
    totalUsers: users.length,
    totalListings: listings.length,
    totalBookings: 856,
    totalRevenue: "$124,580",
  };

  const updateUserRole = (id: number, role: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  const updateUserStatus = (id: number, status: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status } : user)));
  };

  const updateListingStatus = (id: number, status: string) => {
    setListings((prev) => prev.map((listing) => (listing.id === id ? { ...listing, status } : listing)));
  };

  return (
    <AdminDashboardContext.Provider
      value={{ users, setUsers, listings, setListings, stats, updateUserRole, updateUserStatus, updateListingStatus }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
};