import { createContext, useContext, useState, ReactNode } from "react";

interface Accommodation {
  id: string;
  name: string;
  type: string;
  price: number;
  bookings: number;
  occupancy: string;
  status: string;
}

interface Booking {
  id: string;
  property: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  revenue: string;
}

interface HostDashboardContextType {
  accommodations: Accommodation[];
  bookings: Booking[];
  addAccommodation: (accommodation: Omit<Accommodation, "id" | "bookings" | "occupancy">) => void;
  deleteAccommodation: (id: string) => void;
}

const HostDashboardContext = createContext<HostDashboardContextType | undefined>(undefined);

export const useHostDashboard = () => {
  const context = useContext(HostDashboardContext);
  if (!context) {
    throw new Error("useHostDashboard must be used within HostDashboardProvider");
  }
  return context;
};

export const HostDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([
    {
      id: "1",
      name: "Luxury Safari Lodge",
      type: "Lodge",
      price: 320,
      bookings: 24,
      occupancy: "85%",
      status: "Active",
    },
    {
      id: "2",
      name: "Beachfront Villa",
      type: "Villa",
      price: 280,
      bookings: 18,
      occupancy: "72%",
      status: "Active",
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      property: "Luxury Safari Lodge",
      guest: "John Doe",
      checkIn: "2024-11-20",
      checkOut: "2024-11-25",
      revenue: "$1,600",
    },
    {
      id: "2",
      property: "Beachfront Villa",
      guest: "Jane Smith",
      checkIn: "2024-11-22",
      checkOut: "2024-11-28",
      revenue: "$1,680",
    },
  ]);

  const addAccommodation = (accommodation: Omit<Accommodation, "id" | "bookings" | "occupancy">) => {
    const newAccommodation: Accommodation = {
      ...accommodation,
      id: Date.now().toString(),
      bookings: 0,
      occupancy: "0%",
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const deleteAccommodation = (id: string) => {
    setAccommodations(accommodations.filter(acc => acc.id !== id));
  };

  return (
    <HostDashboardContext.Provider value={{
      accommodations,
      bookings,
      addAccommodation,
      deleteAccommodation,
    }}>
      {children}
    </HostDashboardContext.Provider>
  );
};
