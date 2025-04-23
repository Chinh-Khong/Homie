import { NextResponse } from 'next/server';
import Room from '@/src/models/Room';
import { connectDB } from '@/src/lib/mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('search_room') || '';
    const searchAddress = searchParams.get('search_address') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '8');
    const skip = (page - 1) * limit;

    // Tạo bộ lọc tìm kiếm
    const filter: any = {};

    // Tìm kiếm theo keyword (name, address, type_room)
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { address: { $regex: keyword, $options: 'i' } },
        { type_room: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Tìm kiếm theo địa chỉ cụ thể
    if (searchAddress) {
      filter.address = { $regex: searchAddress, $options: 'i' };
    }

    // Truy vấn danh sách phòng và tổng số phòng
    const [rooms, total] = await Promise.all([
      Room.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Room.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: rooms,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

