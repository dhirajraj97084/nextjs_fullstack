import User from "@/models/userModels";
import dbToConnect from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

dbToConnect();

export const GET=async(request:NextRequest)=>{
    try {
        const response=NextResponse.json({
            message:"logout successfully",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}