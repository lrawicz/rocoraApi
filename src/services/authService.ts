import  AppDataSource  from "../dataSource";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    await user.hashPassword();
    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user || !(await user.checkPassword(password))) {
      return null; // Authentication failed
    }
    // User authenticated, generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }
}
