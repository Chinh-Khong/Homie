import { connectDB } from "@/src/lib/mongoose";
import Comment from "@/src/models/Comment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { room_id, user_email, comment, user_name, user_avatar } = body;
    if (!room_id || !user_email || !comment) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      room_id,
      user_email,
      comment,
      user_name,
      user_avatar,
    });

    return NextResponse.json({ success: true, comment: newComment }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error when adding comment!",
        error: err.message,
      },
      { status: 500 }
    );
  }
};
