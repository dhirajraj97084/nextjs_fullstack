import User from "@/models/userModels";
import dbToConnect from "@/database/db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

dbToConnect();

export const POST = async (request: NextRequest) => {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "email does not exist" }, { status: 400 })
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ msg: "please enter the right password" }, { status: 400 })
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
      expiresIn: "1d"
    })

    //  return NextResponse.json({msg:"login successfull", token, success:true});
 
    const response = NextResponse.json({
      message: "login successful",
      success: true
    })

    response.cookies.set("token",token,{
      httpOnly:true
    })
    
    return response;
    
   


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}