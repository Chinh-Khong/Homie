import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongoose";
import User from "@/src/models/User";

export async function PUT(request: Request) {
  await connectDB();

  try {
    const data = await request.json();
    const { name, phone, address, email } = data;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          phone: phone,
          address: address,
        },
      },
      {
        new: true,
        runValidators: true,
        select: "name phone address",
      }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Error when update user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
