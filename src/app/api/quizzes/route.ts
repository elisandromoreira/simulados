import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { QuizService } from "@/services/quizService";
import { QuizInput } from "@/types/quiz";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Token de autenticação não fornecido" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    const quizData: QuizInput = await request.json();

    if (!quizData.title) {
      return NextResponse.json(
        { message: "O título do quiz é obrigatório" },
        { status: 400 }
      );
    }

    if (
      quizData.questions &&
      (!Array.isArray(quizData.questions) ||
        quizData.questions.some(
          (question) =>
            !question.content ||
            !Array.isArray(question.options) ||
            question.options.length === 0
        ))
    ) {
      return NextResponse.json(
        { message: "Formato inválido para as questões fornecidas" },
        { status: 400 }
      );
    }

    const quiz = await QuizService.createQuiz(payload.userId, quizData);

    return NextResponse.json(
      { message: "Quiz criado com sucesso", quiz },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar quiz:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao criar o quiz" },
      { status: 500 }
    );
  }
}
