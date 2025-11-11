import { createContext, useContext, useState, ReactNode } from "react";

interface Experience {
  id: number;
  name: string;
  bookings: number;
  rating: number;
  price: string;
  status: string;
  description?: string;
  location?: string;
  duration?: string;
  maxGroupSize?: number;
}

interface Booking {
  id: number;
  experience: string;
  date: string;
  guests: number;
  revenue: string;
}

interface GuideDashboardContextType {
  experiences: Experience[];
  bookings: Booking[];
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: number, experience: Partial<Experience>) => void;
  deleteExperience: (id: number) => void;
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
      id: 1,
      name: "Safari Adventure in Serengeti",
      bookings: 15,
      rating: 4.9,
      price: "$250",
      status: "Active",
    },
    {
      id: 2,
      name: "Mountain Hiking Experience",
      bookings: 8,
      rating: 4.7,
      price: "$180",
      status: "Active",
    },
    {
      id: 3,
      name: "Cultural Village Tour",
      bookings: 12,
      rating: 4.8,
      price: "$120",
      status: "Active",
    },
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      experience: "Safari Adventure",
      date: "2024-11-15",
      guests: 4,
      revenue: "$1,000",
    },
    {
      id: 2,
      experience: "Mountain Hiking",
      date: "2024-11-18",
      guests: 2,
      revenue: "$360",
    },
  ]);

  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = {
      ...experience,
      id: Math.max(...experiences.map(e => e.id), 0) + 1,
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: number, updatedData: Partial<Experience>) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updatedData } : exp
    ));
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <GuideDashboardContext.Provider
      value={{
        experiences,
        bookings,
        addExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
    </GuideDashboardContext.Provider>
  );
};
