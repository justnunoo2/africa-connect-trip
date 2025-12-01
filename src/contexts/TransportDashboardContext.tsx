import React, { createContext, useContext, useState, ReactNode } from "react";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  capacity: number;
  rides: number;
  status: string;
}

interface Ride {
  id: number;
  route: string;
  vehicle: string;
  date: string;
  passengers: number;
  revenue: string;
  status?: string;
}

interface TransportDashboardContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  rides: Ride[];
  setRides: React.Dispatch<React.SetStateAction<Ride[]>>;
  stats: {
    totalVehicles: number;
    activeRides: number;
    totalEarnings: string;
    completedRides: number;
  };
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  deleteVehicle: (id: number) => void;
}

const TransportDashboardContext = createContext<TransportDashboardContextType | undefined>(undefined);

export const TransportDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, name: "Toyota Land Cruiser", type: "SUV", capacity: 7, rides: 58, status: "Available" },
    { id: 2, name: "Mercedes Sprinter Van", type: "Van", capacity: 12, rides: 45, status: "Available" },
    { id: 3, name: "Toyota Hilux", type: "Pickup", capacity: 5, rides: 39, status: "In Service" },
  ]);

  const [rides, setRides] = useState<Ride[]>([
    { id: 1, route: "Nairobi → Mombasa", vehicle: "Land Cruiser", date: "2024-11-16", passengers: 5, revenue: "$450", status: "Confirmed" },
    { id: 2, route: "Cape Town → Garden Route", vehicle: "Sprinter Van", date: "2024-11-17", passengers: 8, revenue: "$680", status: "Pending" },
    { id: 3, route: "Johannesburg → Pretoria", vehicle: "Toyota Hilux", date: "2024-11-19", passengers: 4, revenue: "$120", status: "Confirmed" },
  ]);

  const stats = {
    totalVehicles: vehicles.length,
    activeRides: rides.length,
    totalEarnings: "$3,280",
    completedRides: 142,
  };

  const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
    setVehicles((prev) => [...prev, { ...vehicle, id: Date.now() }]);
  };

  const deleteVehicle = (id: number) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <TransportDashboardContext.Provider
      value={{ vehicles, setVehicles, rides, setRides, stats, addVehicle, deleteVehicle }}
    >
      {children}
    </TransportDashboardContext.Provider>
  );
};

export const useTransportDashboard = () => {
  const context = useContext(TransportDashboardContext);
  if (!context) {
    throw new Error("useTransportDashboard must be used within a TransportDashboardProvider");
  }
  return context;
};