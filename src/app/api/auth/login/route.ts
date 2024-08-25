import { NextResponse } from "next/server";
import { AuthService } from "@/services/authService";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const authResult = await AuthService.authenticateUser(email, password);

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
