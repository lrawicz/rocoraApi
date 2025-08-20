import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }
      const user = await this.authService.register(username, password);
      res.status(201).json({ message: "User registered successfully", user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      if (error.code === "23505") { // PostgreSQL unique violation error code
        res.status(409).json({ message: "Username already exists" });
      } else {
        res.status(500).json({ message: "Error registering user", error: error.message });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }
      const token = await this.authService.login(username, password);
      if (token) {
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  }
}
