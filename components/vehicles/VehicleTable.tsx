"use client";

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';
import { FaCar } from "react-icons/fa6";
import { StatusBadge } from './StatusBadge';
// import { Vehicle } from '@/lib/types/vehicle';
import { useVehicles } from '@/hooks/useVehicles';
import EditStatus from '../ui/EditStatus';

export default function VehicleTable() {
  const { vehicles, loading, toggleVehicleStatus } = useVehicles();


  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!Array.isArray(vehicles)) {
    return <div className="flex justify-center items-center h-64">No vehicles found</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FaCar className="h-4 w-4" />
                  {vehicle.name}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={vehicle.status} />
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(vehicle.lastUpdated), { addSuffix: true })}
              </TableCell>
              <TableCell>
                  <EditStatus vId={vehicle._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}