import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import nodemailer from 'nodemailer';
import { connectDB } from '@/src/lib/mongoose';

const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"HOMIE - Verify account',
    to: email,
    subject: 'OTP code to verify your account',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi there,</h2>
        <p>You have just registered an account at <strong>HOMIE</strong>.</p>
        <p>Your OTP code is:</p>
        <h1 style="color: #007BFF">${otp}</h1>
        <p>The code is valid for <strong>10 minutes</strong>.</p>
        <br />
        <p style="font-size: 12px; color: #777;">If you do not fulfill this request, please ignore this email.</p>
        <p style="font-size: 12px; color: #777;">HOMIE Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {}
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email has been registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    const newUser = new User({
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
      isVerified: false,
    });
    await newUser.save();
    await sendOtpEmail(email, otp);
    return NextResponse.json({ message: "Registration successful! Please check your email to receive OTP." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
