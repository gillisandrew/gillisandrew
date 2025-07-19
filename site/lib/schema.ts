import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Email address is not valid" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  token: z.string()
});