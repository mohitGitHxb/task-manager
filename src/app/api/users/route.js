import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
connectDb().then(() => {
  console.log("Connection established!!! can start server")
}).catch((err) => {
  console.log("Connection error,error: " + err);
});


export async function GET() {
  try {
    const users = await User.find();
    if(!users){
      console.log("There is no user");
    }
    return NextResponse.json(users, {
      status: 200,
      statusText: "fetched users successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 404,
      statusText: "Failed to fetch users",
    });
  }
}
// export function GET(request) {
//   const users = [
//     {
//         id: 1,
//         name: "John",
//         age: 25,
//         profession: "Engineer"
//       },
//       {
//         id: 2,
//         name: "Sarah",
//         age: 30,
//         profession: "Teacher"
//       },
//       {
//         id: 3,
//         name: "Michael",
//         age: 40,
//         profession: "Doctor"
//       },
//       {
//         id: 4,
//         name: "Emily",
//         age: 28,
//         profession: "Graphic Designer"
//       },
//       {
//         id: 5,
//         name: "David",
//         age: 35,
//         profession: "Architect"
//       },
//       {
//         id: 6,
//         name: "Lisa",
//         age: 32,
//         profession: "Lawyer"
//       },
//       {
//         id: 7,
//         name: "Daniel",
//         age: 45,
//         profession: "Accountant"
//       },
//       {
//         id: 8,
//         name: "Sophia",
//         age: 29,
//         profession: "Writer"
//       }
//   ];

//   return NextResponse.json(users);
// }
export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();

  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });
  try {
    const createdUser = await user.save();
    const response = NextResponse.json(createdUser, {
      status: 201,
      statusText: "Created user successfully",
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create user !!",
      },
      { status: 401, statusText: "Failed to create user" }
    );
  }
}



// Params or query parameters
/* export function DELETE(){
    console.log("Deleting...");
    return NextResponse.json({
        message:"deleted users",
    },{
        status:201,
        statusText:"nextjs is op"
    });
} */
