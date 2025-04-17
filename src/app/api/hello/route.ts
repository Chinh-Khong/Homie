import { NextResponse } from 'next/server';
import { connectDB } from "@/src/lib/mongoose";
import User from "@/src/models/User";

export async function GET() {
  await connectDB();

  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi khi lấy dữ liệu', error }, { status: 500 });
  }
}
