import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import { connectDB } from '@/src/lib/mongoose';
import { isValidObjectId } from 'mongoose';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Kết nối MongoDB
    await connectDB();

    const { id } = params;

    // Kiểm tra ID hợp lệ
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid room ID' },
        { status: 400 }
      );
    }

    // Tìm phòng theo ID
    const room = await Room.findById(id).select(
      'name images address price rating description_room bed_rooms bath_room occupancy_limit'
    );

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      );
    }

    // Trả về dữ liệu phòng
    return NextResponse.json({ success: true, data: room });
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}