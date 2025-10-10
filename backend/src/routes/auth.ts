import { prisma } from "../server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server configuration error: JWT_SECRET not set." });
  }
  const JWT_SECRET: string = process.env.JWT_SECRET;

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res
        .status(409)
        .json({ message: "A user with this email already exists." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed },
      select: { id: true, email: true },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "User created successfully.",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during registration." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server configuration error: JWT_SECRET not set." });
  }
  const JWT_SECRET: string = process.env.JWT_SECRET;

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (user not found)." });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (password incorrect)." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful.",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during login." });
  }
});

export default router;
