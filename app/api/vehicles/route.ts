import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export async function GET() {
  try {
    await dbConnect();
    const vehicles = await Vehicle.find({}).sort({ lastUpdated: -1 });
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const vehicle = await Vehicle.create({
      name: body.name,
      status: body.status,
    });
    
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}