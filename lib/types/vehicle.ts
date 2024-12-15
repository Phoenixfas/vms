export interface Vehicle {
  _id: string;
  name: string;
  status: string;
  lastUpdated: string;
}

export type VehicleStatus = 'Available' | 'In Use' | 'Maintenance' | 'Out of Service';

export const VEHICLE_STATUSES: VehicleStatus[] = [
  'Available',
  'In Use',
  'Maintenance',
  'Out of Service'
];