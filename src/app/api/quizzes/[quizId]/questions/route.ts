import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { QuizService } from "@/services/quizService";
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

    try {
      const updatedQuiz = await QuizService.addQuestionsToQuiz(
        params.quizId,
        payload.userId,
        questions
      );
      return NextResponse.json(
        { message: "Questões adicionadas com sucesso", quiz: updatedQuiz },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Quiz não encontrado") {
          return NextResponse.json({ message: error.message }, { status: 404 });
        }
        if (error.message === "Você não tem permissão para editar este quiz") {
          return NextResponse.json({ message: error.message }, { status: 403 });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error("Erro ao adicionar questões:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao adicionar as questões" },
      { status: 500 }
    );
  }
}
