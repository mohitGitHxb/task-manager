import { NextResponse } from "next/server";

export function DELETE(req,{params:{userId}}){
    console.log(userId);
    return NextResponse.json({
        message:"deleted users",
    },{
        status:201,
        statusText:"nextjs is op"
    });
}