import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Token de autenticação não fornecido" },
      { status: 401 }
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Token de autenticação inválido" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/simulados/:path*", "/api/users/:path*"],
};
