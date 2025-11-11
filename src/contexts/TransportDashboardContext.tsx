import { createContext, useContext, useState, ReactNode } from "react";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  rides: number;
  status: string;
}

interface Ride {
  id: string;
  route: string;
  vehicle: string;
  date: string;
  passengers: number;
  revenue: string;
}

interface TransportDashboardContextType {
  vehicles: Vehicle[];
  rides: Ride[];
  addVehicle: (vehicle: Omit<Vehicle, "id" | "rides">) => void;
  deleteVehicle: (id: string) => void;
}

const TransportDashboardContext = createContext<TransportDashboardContextType | undefined>(undefined);

export const useTransportDashboard = () => {
  const context = useContext(TransportDashboardContext);
  if (!context) {
    throw new Error("useTransportDashboard must be used within TransportDashboardProvider");
  }
  return context;
};

export const TransportDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Toyota Land Cruiser",
      type: "SUV",
      capacity: 7,
      rides: 58,
      status: "Available",
    },
    {
      id: "2",
      name: "Mercedes Sprinter Van",
      type: "Van",
      capacity: 12,
      rides: 45,
      status: "Available",
    },
    {
      id: "3",
      name: "Toyota Hilux",
      type: "Pickup",
      capacity: 5,
      rides: 39,
      status: "In Service",
    },
  ]);

  const [rides, setRides] = useState<Ride[]>([
    {
      id: "1",
      route: "Nairobi → Mombasa",
      vehicle: "Land Cruiser",
      date: "2024-11-16",
      passengers: 5,
      revenue: "$450",
    },
    {
      id: "2",
      route: "Cape Town → Garden Route",
      vehicle: "Sprinter Van",
      date: "2024-11-17",
      passengers: 8,
      revenue: "$680",
    },
  ]);

  const addVehicle = (vehicle: Omit<Vehicle, "id" | "rides">) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
      rides: 0,
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const deleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <TransportDashboardContext.Provider value={{
      vehicles,
      rides,
      addVehicle,
      deleteVehicle,
    }}>
      {children}
    </TransportDashboardContext.Provider>
  );
};
