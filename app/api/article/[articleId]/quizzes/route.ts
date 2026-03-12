import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  request: Request,
  { params }: { params: { articleId: string } } 
) {
  try {
    const body = await request.json();

    const article = await prisma.article.update({
      where: { id: params.articleId },
      data: {
        title: body.title,
        content: body.content,
        summary: body.summary,
      },
    });

    return NextResponse.json({ message: "Updated", article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  }
}