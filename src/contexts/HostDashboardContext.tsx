import React, { createContext, useContext, useState, ReactNode } from "react";

interface Accommodation {
  id: number;
  name: string;
  bookings: number;
  occupancy: string;
  price: string;
  status: string;
}

interface Booking {
  id: number;
  property: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  revenue: string;
  status?: string;
}

interface HostDashboardContextType {
  accommodations: Accommodation[];
  setAccommodations: React.Dispatch<React.SetStateAction<Accommodation[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  stats: {
    totalProperties: number;
    activeBookings: number;
    monthlyRevenue: string;
    occupancyRate: string;
  };
  addAccommodation: (accommodation: Omit<Accommodation, "id">) => void;
  deleteAccommodation: (id: number) => void;
}

const HostDashboardContext = createContext<HostDashboardContextType | undefined>(undefined);

export const HostDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([
    { id: 1, name: "Luxury Safari Lodge", bookings: 24, occupancy: "85%", price: "$320/night", status: "Active" },
    { id: 2, name: "Beachfront Villa", bookings: 18, occupancy: "72%", price: "$280/night", status: "Active" },
    { id: 3, name: "Mountain Retreat", bookings: 15, occupancy: "68%", price: "$210/night", status: "Active" },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, property: "Luxury Safari Lodge", guest: "John Doe", checkIn: "2024-11-20", checkOut: "2024-11-25", revenue: "$1,600", status: "Confirmed" },
    { id: 2, property: "Beachfront Villa", guest: "Jane Smith", checkIn: "2024-11-22", checkOut: "2024-11-28", revenue: "$1,680", status: "Pending" },
    { id: 3, property: "Mountain Retreat", guest: "Mike Johnson", checkIn: "2024-11-25", checkOut: "2024-11-30", revenue: "$1,050", status: "Confirmed" },
  ]);

  const stats = {
    totalProperties: accommodations.length,
    activeBookings: bookings.length,
    monthlyRevenue: "$8,450",
    occupancyRate: "78%",
  };

  const addAccommodation = (accommodation: Omit<Accommodation, "id">) => {
    setAccommodations((prev) => [...prev, { ...accommodation, id: Date.now() }]);
  };

  const deleteAccommodation = (id: number) => {
    setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <HostDashboardContext.Provider
      value={{ accommodations, setAccommodations, bookings, setBookings, stats, addAccommodation, deleteAccommodation }}
    >
      {children}
    </HostDashboardContext.Provider>
  );
};

export const useHostDashboard = () => {
  const context = useContext(HostDashboardContext);
  if (!context) {
    throw new Error("useHostDashboard must be used within a HostDashboardProvider");
  }
  return context;
};