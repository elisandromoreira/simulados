import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { QuizService } from "@/services/quizService";
import { QuizInput } from "@/types/quiz";

export async function PUT(
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
    const quizData: Partial<QuizInput> = await request.json();

    if (
      !quizData.title &&
      !quizData.description &&
      quizData.isPublic === undefined
    ) {
      return NextResponse.json(
        { message: "Nenhum dado fornecido para atualização" },
        { status: 400 }
      );
    }

    const updatedQuiz = await QuizService.updateQuiz(
      params.quizId,
      payload.userId,
      quizData
    );

    return NextResponse.json(
      { message: "Quiz atualizado com sucesso", quiz: updatedQuiz },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar quiz:", error);
    if (error instanceof Error) {
      if (error.message === "Quiz não encontrado") {
        return NextResponse.json({ message: error.message }, { status: 404 });
      }
      if (error.message === "Você não tem permissão para editar este quiz") {
        return NextResponse.json({ message: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      { message: "Ocorreu um erro ao atualizar o quiz" },
      { status: 500 }
    );
  }
}
