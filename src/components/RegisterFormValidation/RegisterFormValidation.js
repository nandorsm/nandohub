import { z } from 'zod'

export const RegisterFormValidation = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty().email( {message: "Digite um email válido"}),
    password: z.string().min(8, "Mínimo de 8 caracteres")
    .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
    .regex(/(?=.*?[!@#$%^&*])/, "É necessário pelo menos um caractere especial"),
    confirmPassword: z.string().nonempty({ message: "Confirmar a senha é obrigatório"}),
    bio: z.string().nonempty({ message: "Campo obrigatório"}),
    contact: z.string().nonempty({ message: "Campo obrigatório"}),
    course_module: z.string().nonempty({ message: "Campo obrigatório"})
}).refine(( {password, confirmPassword} ) => confirmPassword === password, {
    message: "A confirmação e a senha precisam corresponder",
    path: ["confirmPassword"]
})