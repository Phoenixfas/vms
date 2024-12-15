"use client";

import { useState, useEffect, useCallback } from 'react';
import { Vehicle } from '@/lib/types/vehicle';

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleVehicleStatus = useCallback(async (vehicle: Vehicle) => {
    const newStatus = vehicle.status === 'Available' ? 'In Use' : 'Available';
    try {
      const response = await fetch(`/api/vehicles/${vehicle._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchVehicles();
      }
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  }, [fetchVehicles]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, toggleVehicleStatus, fetchVehicles };
}