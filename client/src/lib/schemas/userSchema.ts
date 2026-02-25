import {z} from 'zod';
import agent from '../api/agent';
import axios from 'axios';


const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`})
    .min(1, {message: `${fieldName} is required`})

export const userSchema = z.object({
     email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
   .refine(
  async (email) => {
    try {
      const res = await agent.get("https://localhost:5001/api/account/email-exists", { params: { email } });

      console.log("email-exists response:", res.data, typeof res.data);
      return true; // 200 => available
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          return false; // email taken
        }
      }
      return true; // other errors: don't block user
    }
  },
  { message: "Email is already registered" }
),

    displayName: requiredString('Disply Name'),
    password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
})

export type UserSchema = z.infer<typeof userSchema>