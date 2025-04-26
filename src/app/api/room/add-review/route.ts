import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/mongoose';
import Review from '@/src/models/Review';

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

    const reviews = await Review.find({ room_id: roomId }).select(
      'name location date rating comment'
    );

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No reviews found for this room' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}