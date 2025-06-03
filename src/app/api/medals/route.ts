import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  
  try {
    // I have used path and file system to fetch the data. this will be replaced with actuall API call.
    const filePath = path.join(process.cwd(), "src/db", "medals.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    console.log("data", data);
    return NextResponse.json({medals: data}, { status: 200 });
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) {
      message = error.message;
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}
