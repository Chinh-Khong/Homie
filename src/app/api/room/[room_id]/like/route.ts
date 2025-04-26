import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongoose";
import Like from "@/src/models/Like";
import User from "@/src/models/User";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ room_id: string }> }
) {
  const { room_id } = await params;

  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }
    const token = authHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const alreadyLiked = await Like.findOne({
      userId: user._id,
      roomId: room_id,
    });

    if (alreadyLiked) {
      return NextResponse.json({ message: "Already liked" }, { status: 400 });
    }

    const newLike = new Like({
      userId: user._id,
      roomId: room_id,
    });

    await newLike.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to like room" },
      { status: 500 }
    );
  }
}
