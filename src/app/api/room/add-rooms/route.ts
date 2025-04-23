import cloudinary from "@/src/lib/cloudinary";
import { connectDB } from "@/src/lib/mongoose";
import Room from "@/src/models/Room";
import Counter from "@/src/models/Counter";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/src/middleware/auth";

export const POST = async (req: NextRequest) => {
  await connectDB();
  const authResult = await verifyAdmin(req);

  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.status }
    );
  }

  const formData = await req.formData();

  const file: File | null = formData.get("image") as unknown as File;

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const rentalDate = formData.get("rentalDate") as string;
  const price = formData.get("price") as string;
  const rating = formData.get("rating") as string;
  const description_room = formData.get("description_room") as string;
  const check_in = formData.get("check_in") as string;
  const check_out = formData.get("check_out") as string;
  const status = formData.get("status") as string;
  const bed_rooms = formData.get("bed_rooms") as string;
  const bath_room = formData.get("bath_room") as string;
  const occupancy_limit = formData.get("occupancy_limit") as string;
  const type_room = formData.get("type_room") as string;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: "rooms",
    });

    const counter = await Counter.findOneAndUpdate(
      { _id: "room_id" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const room_id = counter.sequence_value;

    // Save to MongoDB
    const room = await Room.create({
      room_id,
      name,
      address,
      rentalDate,
      price,
      rating,
      description_room,
      check_in,
      check_out,
      status,
      bed_rooms,
      bath_room,
      occupancy_limit,
      type_room,
      image: uploadRes.secure_url,
    });

    return NextResponse.json({ success: true, room });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Upload failed", error: err },
      { status: 500 }
    );
  }
};
