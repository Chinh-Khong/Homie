import { NextResponse } from 'next/server';
import User from '../../../models/User';
import { connectDB } from '@/src/lib/mongoose';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email does not exist" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "Account has been authenticated" }, { status: 200 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: "OTP is incorrect" }, { status: 400 });
    }

    if (user.otpExpiresAt < new Date()) {
      return NextResponse.json({ message: "OTP has expired" }, { status: 400 });
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: "Account verification successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
