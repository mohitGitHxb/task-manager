// errorMessage.js

import { NextResponse } from 'next/server';

export default function errorMessage(message,successStatus,statusCode,statusText = "Error occurred") {
  return new NextResponse.json({ message:message, successStatus:successStatus,},{status:statusCode,statusText:statusText });
}
