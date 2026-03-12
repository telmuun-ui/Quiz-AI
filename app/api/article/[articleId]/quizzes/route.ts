import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  request: NextRequest, 
  context: { params: Promise<{ articleId: string }> } 
) {
  try {

    const { articleId } = await context.params;
    

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const article = await prisma.article.update({
      where: { id: articleId }, 
      data: {
        title: body.title,
        content: body.content,
        summary: body.summary,
      },
    });

    return NextResponse.json({ message: "Updated", article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed", error: String(error) }, { status: 500 });
  }
}