import { NextResponse } from "next/server"

export const GET=async()=>{
    return new NextResponse("this is a dynamic server side login page")
} 