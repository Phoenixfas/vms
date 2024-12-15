import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await dbConnect();
    
    const newVehicle = await Vehicle.findByIdAndUpdate(
      id,
      {
        ...(body.status && { status: body.status }),
        lastUpdated: new Date(),
      },
      { new: true },
    )
    
    if (!newVehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    return NextResponse.json({vehicle: newVehicle});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}