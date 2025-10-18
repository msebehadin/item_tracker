import express, { type Request, type Response } from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items"
import { verifyToken } from "./middleware/authMd";
const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient(); //initiate prisma


app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", itemRoutes);
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
}
testDbConnection();
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("DB Health Check Failed:", error);
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});
app.get("/api/secret", verifyToken, async (req, res) => {
  res.json({ message: "the protected routes succeed" });
});
app.listen(port, () => {
  console.log(`the server is running http://localhost:${port} `);
});
export { prisma };
