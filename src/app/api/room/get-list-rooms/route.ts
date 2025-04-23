import { NextResponse } from "next/server";
import Room from "@/src/models/Room";
import { connectDB } from "@/src/lib/mongoose";
import { verifyAdmin } from "@/src/middleware/auth";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authResult = await verifyAdmin(req);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("search_room") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { address: { $regex: keyword, $options: "i" } },
            { type_room: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

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
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
