import { NextResponse } from "next/server";
import { AuthService } from "@/services/authService";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message:
            "Dados incompletos. Username, email e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    const user = await AuthService.registerUser(username, email, password);

    return NextResponse.json(
      { message: "Usuário criado com sucesso", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const field = error.meta?.target as string[];
        if (field && field.includes("username")) {
          return NextResponse.json(
            {
              message:
                "Este nome de usuário já está em uso. Por favor, escolha outro.",
            },
            { status: 409 }
          );
        } else if (field && field.includes("email")) {
          return NextResponse.json(
            {
              message:
                "Este endereço de email já está registrado. Por favor, use outro ou faça login.",
            },
            { status: 409 }
          );
        }
      }
    }

    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      {
        message:
          "Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}
