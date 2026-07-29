import { z } from 'zod'

export * from 'zod'

const ONLY_NUMBERS_REGEX = /^\d+$/

export const messages = {
    required: 'Polje je obvezno.',
}

export const email = z
    .string()
    .min(1, 'Polje je obvezno.')
    .max(45, 'Email mora sadržavati do 45 znakova.')
    .email('Email nije pravilnog formata.')

export const jmbag = z
    .string()
    .min(1, 'Polje je obvezno.')
    .length(10, 'JMBAG mora sadržavati 10 brojeva.')
    .regex(ONLY_NUMBERS_REGEX, 'JMBAG mora sadržavati samo brojeve.')

export const phoneNumber = z
    .string({ required_error: messages.required })
    .min(1, messages.required)
    .max(25, 'Broj mobitela mora sadržavati do 25 znakova.')

export const password = z
    .string()
    .min(1, 'Polje je obvezno.')
    .min(8, 'Lozinka mora sadržavati najmanje 8 znakova.')
    .max(50, 'Lozinka mora sadržavati do 50 znakova.')
    .regex(/[a-z]/, 'Lozinka mora sadržavati barem jedno malo slovo.')
    .regex(/[A-Z]/, 'Lozinka mora sadržavati barem jedno veliko slovo.')
    .regex(/[0-9]/, 'Lozinka mora sadržavati barem jedan broj.')

export const firstName = z
    .string()
    .min(1, messages.required)
    .max(45, 'Ime mora sadržavati do 45 znakova.')

export const lastName = z
    .string()
    .min(1, messages.required)
    .max(45, 'Prezime mora sadržavati do 45 znakova.')

export const oib = z
    .string()
    .min(1, { message: messages.required })
    .length(11, 'OIB mora sadržavati 11 znakova.')
    .regex(ONLY_NUMBERS_REGEX, 'OIB mora sadržavati samo brojeve.')

export const address = z
    .string()
    .min(1, { message: messages.required })
    .max(100, 'Adresa može sadržavati do 100 znakova.')

export const companyName = z
    .string()
    .min(1, { message: messages.required })
    .max(90, { message: 'Ime mora sadržavati do 90 znakova.' })

export const verificationCode = z
    .string()
    .length(6, { message: 'Kod je neispravnog formata.' })

export const rating = z
    .number()
    .int()
    .min(1)
    .max(5)

export const jobDescription = z
    .string()
    .max(500, 'Opis posla mora sadržavati do 500 znakova.')

export const jobHourlyRate = z
    .number({ required_error: messages.required })
    .positive()

export const maximumApprovedApplications = z
    .number()
    .int()
    .min(1)

export const jobTitle = z
    .string()
    .min(1, messages.required)
    .max(70, 'Naslov posla može sadržavati do 70 znakova.')

export const stringDate = z.union([
    z.string().transform((dateString, context) => {
        const date = new Date(dateString)
        if (!z.date().safeParse(date).success) {
            context.addIssue({ code: z.ZodIssueCode.invalid_date })
        }
        return date
    }),
    z.date(),
])