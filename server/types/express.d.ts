import { PublicUserType } from "../src/models/User";

declare global {
  namespace Express {
    interface Request {
      user?: PublicUserType; // Assuming user is added to the request object after authentication
    }
  }
}