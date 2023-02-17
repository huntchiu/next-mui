import { Session } from "next-auth";
import request from "../helpers/request";
import User from "../models/User";

interface AuthProps {
  session: Session | null;
}
export const profile = async ({ session }: AuthProps) => {
  const response = await request.get<User>("/users/me", {
    headers: { Authorization: `Bearer ${session?.jwt}` },
  });
  return response.data;
};
