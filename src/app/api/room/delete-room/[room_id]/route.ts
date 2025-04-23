import { connectDB } from "@/src/lib/mongoose";
import { verifyAdmin } from "@/src/middleware/auth";
import Room from "@/src/models/Room";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { room_id: string } }
) => {
  try {
    await connectDB();

    const authResult = await verifyAdmin(req);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    const { room_id } = params;

    const deletedRoom = await Room.findOneAndDelete({ room_id });

    if (!deletedRoom) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to delete room", error: err.message },
      { status: 500 }
    );
  }
};
