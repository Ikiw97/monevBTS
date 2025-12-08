import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { 
  handleGetData, 
  handleInsertData, 
  handleUpdateData, 
  handleDeleteData,
  handleTestConnection 
} from "./routes/supabase";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
    // Supabase routes
  app.get("/api/supabase/test", handleTestConnection);
  app.get("/api/supabase/:tableName", handleGetData);
  app.post("/api/supabase/:tableName", handleInsertData);
  app.put("/api/supabase/:tableName/:id", handleUpdateData);
  app.delete("/api/supabase/:tableName/:id", handleDeleteData);

  return app;
}
