import { createContext, useContext, useState, ReactNode } from "react";

interface Experience {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  bookings: number;
  rating: number;
}

interface Booking {
  id: string;
  experience: string;
  client: string;
  date: string;
  people: number;
  revenue: string;
  status: string;
}

interface GuideDashboardContextType {
  experiences: Experience[];
  bookings: Booking[];
  addExperience: (experience: Omit<Experience, "id" | "bookings" | "rating">) => void;
  deleteExperience: (id: string) => void;
  updateBookingStatus: (id: string, status: string) => void;
}

const GuideDashboardContext = createContext<GuideDashboardContextType | undefined>(undefined);

export const useGuideDashboard = () => {
  const context = useContext(GuideDashboardContext);
  if (!context) {
    throw new Error("useGuideDashboard must be used within GuideDashboardProvider");
  }
  return context;
};

export const GuideDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      name: "Serengeti Safari Tour",
      location: "Serengeti, Tanzania",
      duration: "3 days",
      price: 450,
      bookings: 28,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Table Mountain Hike",
      location: "Cape Town, South Africa",
      duration: "Half day",
      price: 85,
      bookings: 45,
      rating: 4.9,
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      experience: "Serengeti Safari Tour",
      client: "John Smith",
      date: "2024-11-20",
      people: 4,
      revenue: "$1,800",
      status: "Confirmed",
    },
    {
      id: "2",
      experience: "Table Mountain Hike",
      client: "Emma Wilson",
      date: "2024-11-18",
      people: 2,
      revenue: "$170",
      status: "Pending",
    },
  ]);

  const addExperience = (experience: Omit<Experience, "id" | "bookings" | "rating">) => {
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString(),
      bookings: 0,
      rating: 0,
    };
    setExperiences([...experiences, newExperience]);
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateBookingStatus = (id: string, status: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  return (
    <GuideDashboardContext.Provider value={{
      experiences,
      bookings,
      addExperience,
      deleteExperience,
      updateBookingStatus,
    }}>
      {children}
    </GuideDashboardContext.Provider>
  );
};
