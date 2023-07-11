import { z } from 'zod'

export const LoginFormValidation = z.object({
    email: z.string().nonempty({message: 'Deve conter ao menos 1 caractere'}).email({message: 'Email inválido'}),
    password: z.string().nonempty({message: 'Deve conter ao menos 1 caractere'})
})