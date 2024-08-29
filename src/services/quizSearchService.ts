import prisma from "@/lib/prisma";

interface SearchParams {
  query: string;
  page: number;
  limit: number;
}

interface SearchResult {
  quizzes: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class QuizSearchService {
  static async searchQuizzes({
    query,
    page,
    limit,
  }: SearchParams): Promise<SearchResult> {
    const skip = (page - 1) * limit;

    const quizzes = await prisma.quiz.findMany({
      where: {
        isPublic: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: { questions: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.quiz.count({
      where: {
        isPublic: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return {
      quizzes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
