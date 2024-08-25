import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = await generateToken({ userId: user.id });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const authResult = await authenticateUser(email, password);

    if (!authResult) {
      return NextResponse.json(
        { message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login realizado com sucesso",
        ...authResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return NextResponse.json(
      {
        message:
          "Ocorreu um erro ao processar o login. Por favor, tente novamente mais tarde.",
      },
      { status: 500 }
    );
  }
}
