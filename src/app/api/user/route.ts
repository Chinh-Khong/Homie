import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongoose";
import User from "@/src/models/User";
import { getServerSession } from "next-auth";

export async function PUT(request: Request) {
  await connectDB();

  try {
    const data = await request.json();
    const { name, phone, address, email } = data;

    if (!name) {
      return NextResponse.json(
        { message: "Tên không được để trống" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone: phone || "",
        address: address || "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi cập nhật thông tin",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
