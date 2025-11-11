import { createContext, useContext, useState, ReactNode } from "react";

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
}

interface HostDashboardContextType {
  accommodations: Accommodation[];
  bookings: Booking[];
  addAccommodation: (accommodation: Omit<Accommodation, "id">) => void;
  updateAccommodation: (id: number, accommodation: Partial<Accommodation>) => void;
  deleteAccommodation: (id: number) => void;
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
      id: 1,
      name: "Luxury Safari Lodge",
      bookings: 24,
      occupancy: "85%",
      price: "$320/night",
      status: "Active",
    },
    {
      id: 2,
      name: "Beachfront Villa",
      bookings: 18,
      occupancy: "72%",
      price: "$280/night",
      status: "Active",
    },
    {
      id: 3,
      name: "Mountain Retreat",
      bookings: 15,
      occupancy: "68%",
      price: "$210/night",
      status: "Active",
    },
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      property: "Luxury Safari Lodge",
      guest: "John Doe",
      checkIn: "2024-11-20",
      checkOut: "2024-11-25",
      revenue: "$1,600",
    },
    {
      id: 2,
      property: "Beachfront Villa",
      guest: "Jane Smith",
      checkIn: "2024-11-22",
      checkOut: "2024-11-28",
      revenue: "$1,680",
    },
  ]);

  const addAccommodation = (accommodation: Omit<Accommodation, "id">) => {
    const newAccommodation = {
      ...accommodation,
      id: Math.max(...accommodations.map(a => a.id), 0) + 1,
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const updateAccommodation = (id: number, updatedData: Partial<Accommodation>) => {
    setAccommodations(accommodations.map(acc => 
      acc.id === id ? { ...acc, ...updatedData } : acc
    ));
  };

  const deleteAccommodation = (id: number) => {
    setAccommodations(accommodations.filter(acc => acc.id !== id));
  };

  return (
    <HostDashboardContext.Provider
      value={{
        accommodations,
        bookings,
        addAccommodation,
        updateAccommodation,
        deleteAccommodation,
      }}
    >
      {children}
    </HostDashboardContext.Provider>
  );
};
