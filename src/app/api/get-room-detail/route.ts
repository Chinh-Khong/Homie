import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import { connectDB } from '@/src/lib/mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('room_id');
    if (!roomId) {
      return NextResponse.json(
        { success: false, message: 'Room ID is required' },
        { status: 400 }
      );
    }

    const room = await Room.findOne({ room_id: roomId });
    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: room,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch room details' },
      { status: 500 }
    );
  }
}