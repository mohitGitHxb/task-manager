import { NextResponse } from "next/server";

export function GET(req) {
  const users = [
    {
        id: 1,
        name: "John",
        age: 25,
        profession: "Engineer"
      },
      {
        id: 2,
        name: "Sarah",
        age: 30,
        profession: "Teacher"
      },
      {
        id: 3,
        name: "Michael",
        age: 40,
        profession: "Doctor"
      },
      {
        id: 4,
        name: "Emily",
        age: 28,
        profession: "Graphic Designer"
      },
      {
        id: 5,
        name: "David",
        age: 35,
        profession: "Architect"
      },
      {
        id: 6,
        name: "Lisa",
        age: 32,
        profession: "Lawyer"
      },
      {
        id: 7,
        name: "Daniel",
        age: 45,
        profession: "Accountant"
      },
      {
        id: 8,
        name: "Sophia",
        age: 29,
        profession: "Writer"
      }
  ];

  return NextResponse.json(users);
}

// Params or query parameters
export function DELETE(){
    console.log("Deleting...");
    return NextResponse.json({
        message:"deleted users",
    },{
        status:201,
        statusText:"nextjs is op"
    });
}
