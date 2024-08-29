import { NextResponse } from "next/server";
import { QuizSearchService } from "@/services/quizSearchService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const searchResult = await QuizSearchService.searchQuizzes({
      query,
      page,
      limit,
    });

    return NextResponse.json(searchResult);
  } catch (error) {
    console.error("Erro ao buscar simulados:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao buscar os simulados" },
      { status: 500 }
    );
  }
}
