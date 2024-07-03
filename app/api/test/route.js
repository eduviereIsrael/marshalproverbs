import { NextResponse } from "next/server";


export async function GET() {
    try {
      
  
      return NextResponse.json({status: "ok", message: "Touchdown server"},  { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
  