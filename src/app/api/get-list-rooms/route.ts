import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || '');
  }
};

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find();
    return NextResponse.json({ success: true, data: rooms });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch rooms' }, { status: 500 });
}
}