import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { QuizQuestion } from "@/types/quiz";

export async function POST(
  request: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Token de autenticação não fornecido" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    const { questions }: { questions: QuizQuestion[] } = await request.json();

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { message: "Formato inválido para as questões" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: params.quizId },
      include: { author: true },
    });

    if (!quiz) {
      return NextResponse.json(
        { message: "Quiz não encontrado" },
        { status: 404 }
      );
    }

    if (quiz.author.id !== payload.userId) {
      return NextResponse.json(
        { message: "Você não tem permissão para editar este quiz" },
        { status: 403 }
      );
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: params.quizId },
      data: {
        questions: {
          create: questions.map((question) => ({
            content: question.content,
            explanation: question.explanation,
            options: {
              create: question.options.map((option) => ({
                content: option.content,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Questões adicionadas com sucesso", quiz: updatedQuiz },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao adicionar questões:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao adicionar as questões" },
      { status: 500 }
    );
  }
}
