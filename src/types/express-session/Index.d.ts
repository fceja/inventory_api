import "express-session";
declare module "express-session" {
  export interface SessionData {
    userId: string;
    email: string;
    userRole: string;
    token: string;
  }
}
