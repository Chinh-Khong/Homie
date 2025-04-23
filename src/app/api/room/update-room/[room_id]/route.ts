import cloudinary from "@/src/lib/cloudinary";
import { connectDB } from "@/src/lib/mongoose";
import { verifyAdmin } from '@/src/middleware/auth';
import Room from "@/src/models/Room";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    // Kết nối cơ sở dữ liệu
    await connectDB();

    const authResult = await verifyAdmin(req);

    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    // Lấy dữ liệu từ formData
    const formData = await req.formData();
    const roomId = formData.get("room_id") as string;
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

    // Kiểm tra dữ liệu đầu vào
    if (!roomId || !name || !address) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: room_id, name, or address",
        },
        { status: 400 }
      );
    }

    // Upload hình ảnh nếu có
    let imageUrl = null;
    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${file.type};base64,${buffer.toString(
          "base64"
        )}`;

        const uploadRes = await cloudinary.uploader.upload(base64Image, {
          folder: "rooms",
        });

        imageUrl = uploadRes.secure_url; // Lấy URL hình ảnh đã upload
      } catch (uploadError: any) {
        console.error("Error uploading image:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Image upload failed",
            error: uploadError.message,
          },
          { status: 500 }
        );
      }
    }

    // Cập nhật thông tin phòng
    const updatedRoom = await Room.findOneAndUpdate(
      { room_id: roomId }, // Tìm kiếm theo room_id
      {
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
        image: imageUrl || undefined, // Nếu có ảnh mới thì cập nhật
      },
      { new: true } // Trả về document đã cập nhật
    );

    // Kiểm tra nếu không tìm thấy phòng
    if (!updatedRoom) {
      console.error("Room not found with ID:", roomId);
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    // Trả về kết quả thành công
    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    console.error("Error updating room:", err);
    return NextResponse.json(
      { success: false, message: "Update failed", error: err.message },
      { status: 500 }
    );
  }
};
