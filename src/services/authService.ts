import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export class AuthService {
  static async registerUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  static async authenticateUser(email: string, password: string) {
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
}
