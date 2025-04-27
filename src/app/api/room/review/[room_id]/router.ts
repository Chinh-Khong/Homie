import { connectDB } from "@/src/lib/mongoose";
import Review from "@/src/models/Review";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { room_id: string } }) => {
  await connectDB();

  const { room_id } = params;
  console.log("Chinh99999Chinh99999", room_id);

  if (!room_id) {
    return NextResponse.json(
      { success: false, message: "Missing room_id" },
      { status: 400 }
    );
  }

  try {
    const reviews = await Review.find({ room_id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { room_id, user_email, comment } = body;

    if (!room_id || !user_email || !comment) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = await Review.create({ room_id, user_email, comment });
    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
};