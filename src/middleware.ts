import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Token de autenticação não fornecido" },
      { status: 401 }
    );
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return NextResponse.json(
      { message: "Token de autenticação inválido" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/quizzes/:path*", "/api/users/:path*"],
};
