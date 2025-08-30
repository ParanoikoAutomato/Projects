import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import categoryRoutes from "./routes/category.routes";
import projectRoutes from "./routes/project.routes";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.APP_PORT;

// Connect to MongoDB
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/projects", projectRoutes);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
