import {z} from 'zod';


const requiredString = (fieldName: string) => z.string({error: `${fieldName} is required`})
    .min(1, {message: `${fieldName} is required`})

export const loginSchema = z.object({
    email: requiredString('Email'),
    password: requiredString('Password'),
})

export type LoginSchema = z.infer<typeof loginSchema>