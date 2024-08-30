import { NextResponse,NextRequest } from "next/server";
import dbToConnect from "@/database/db";
import User from "@/models/userModels"
import bcrypt from "bcryptjs"
dbToConnect();

export const POST=async(request:NextRequest)=>{
    try {
        const reqbody= await request.json();
        const { username , email , password}=reqbody;
        console.log(reqbody);

        if (!username || !email || !password ) {
            return NextResponse.json({msg:"please all fields are required"});
        
        }
        const user=await User.findOne({email});
        if (user) {
            return NextResponse.json({msg:"email allready exist"});
        }
        const salt= await bcrypt.genSalt(10);
        const hashpassword= await bcrypt.hash(password , salt);

        const newuser=new User({
            username,
            email,
            password : hashpassword,
        })
       const savedUser= await newuser.save();
        console.log(savedUser);
        return  NextResponse.json({message:"user registred successfully",savedUser, success:true});

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
} 