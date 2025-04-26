import { connectDB } from "@/src/lib/mongoose";
import Like from "@/src/models/Like";
import User from "@/src/models/User";
import { NextResponse, NextRequest } from "next/server";

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

    const userId = user._id;

    await Like.deleteOne({ userId, roomId: room_id });

    return NextResponse.json({ success: true, message: "Room unliked" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to unlike room" },
      { status: 500 }
    );
  }
}
