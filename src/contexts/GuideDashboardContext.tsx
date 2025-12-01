import React, { createContext, useContext, useState, ReactNode } from "react";

interface Experience {
  id: number;
  name: string;
  bookings: number;
  rating: number;
  price: string;
  status: string;
}

interface Booking {
  id: number;
  experience: string;
  date: string;
  guests: number;
  revenue: string;
  status?: string;
}

interface GuideDashboardContextType {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  stats: {
    totalExperiences: number;
    activeBookings: number;
    totalEarnings: string;
    averageRating: number;
  };
  addExperience: (experience: Omit<Experience, "id">) => void;
  deleteExperience: (id: number) => void;
}

const GuideDashboardContext = createContext<GuideDashboardContextType | undefined>(undefined);

export const GuideDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, name: "Safari Adventure in Serengeti", bookings: 15, rating: 4.9, price: "$250", status: "Active" },
    { id: 2, name: "Mountain Hiking Experience", bookings: 8, rating: 4.7, price: "$180", status: "Active" },
    { id: 3, name: "Cultural Village Tour", bookings: 12, rating: 4.8, price: "$120", status: "Active" },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, experience: "Safari Adventure", date: "2024-11-15", guests: 4, revenue: "$1,000", status: "Confirmed" },
    { id: 2, experience: "Mountain Hiking", date: "2024-11-18", guests: 2, revenue: "$360", status: "Pending" },
    { id: 3, experience: "Cultural Village Tour", date: "2024-11-20", guests: 6, revenue: "$720", status: "Confirmed" },
  ]);

  const stats = {
    totalExperiences: experiences.length,
    activeBookings: bookings.length,
    totalEarnings: "$4,850",
    averageRating: 4.8,
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    setExperiences((prev) => [...prev, { ...experience, id: Date.now() }]);
  };

  const deleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <GuideDashboardContext.Provider
      value={{ experiences, setExperiences, bookings, setBookings, stats, addExperience, deleteExperience }}
    >
      {children}
    </GuideDashboardContext.Provider>
  );
};

export const useGuideDashboard = () => {
  const context = useContext(GuideDashboardContext);
  if (!context) {
    throw new Error("useGuideDashboard must be used within a GuideDashboardProvider");
  }
  return context;
};