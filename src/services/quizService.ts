import prisma from "@/lib/prisma";
import { QuizInput } from "@/types/quiz";

export class QuizService {
  static async createQuiz(authorId: string, quizData: QuizInput) {
    return prisma.quiz.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        isPublic: quizData.isPublic,
        authorId: authorId,
        questions: quizData.questions
          ? {
              create: quizData.questions.map((question) => ({
                content: question.content,
                explanation: question.explanation,
                options: {
                  create: question.options.map((option) => ({
                    content: option.content,
                    isCorrect: option.isCorrect,
                  })),
                },
              })),
            }
          : undefined,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }
}
