import { z } from 'zod'
import { ComplaintStatus } from './enums'

const ONLY_NUMBERS_REGEX = /^\d+$/
const CROATIAN_PHONE_REGEX = /^(?:\+385|0)(?:1|91|92|95|97|99|20|21|22|23|31|32|33|34|35|40|42|43|44|47|48|49|51|52|53|54|55|56|62|63|64|65|71|72|73|74|75|76|77|81|82|83|84|85|86|87|88|89)\d{6,7}$/

export const messages = {
    required: 'Polje je obvezno.',
    invalidDate: 'Datum nije ispravnog formata.',
    invalidEmail: 'Email nije pravilnog formata.',
    emailMaxLength: 'Email mora sadržavati do 45 znakova.',
    jmbagLength: 'JMBAG mora sadržavati 10 brojeva.',
    jmbagOnlyNumbers: 'JMBAG mora sadržavati samo brojeve.',
    phoneMaxLength: 'Broj mobitela mora sadržavati do 25 znakova.',
    passwordMinLength: 'Lozinka mora sadržavati najmanje 8 znakova.',
    passwordMaxLength: 'Lozinka mora sadržavati do 50 znakova.',
    passwordLowercase: 'Lozinka mora sadržavati barem jedno malo slovo.',
    passwordUppercase: 'Lozinka mora sadržavati barem jedno veliko slovo.',
    passwordNumber: 'Lozinka mora sadržavati barem jedan broj.',
    nameMaxLength: 'Ime mora sadržavati do 45 znakova.',
    surnameMaxLength: 'Prezime mora sadržavati do 45 znakova.',
    oibLength: 'OIB mora sadržavati 11 znakova.',
    oibOnlyNumbers: 'OIB mora sadržavati samo brojeve.',
    addressMaxLength: 'Adresa može sadržavati do 100 znakova.',
    companyNameMaxLength: 'Ime tvrtke mora sadržavati do 90 znakova.',
    invalidCode: 'Kod je neispravnog formata.',
    jobDescriptionMaxLength: 'Opis posla mora sadržavati do 500 znakova.',
    jobTitleMaxLength: 'Naslov posla može sadržavati do 70 znakova.',
    invalidPhoneFormat: 'Broj mobitela nije ispravnog formata.',
}

export const email = z
    .string()
    .min(1, messages.required)
    .max(45, messages.emailMaxLength)
    .email(messages.invalidEmail)

export const jmbag = z
    .string()
    .min(1, messages.required)
    .length(10, messages.jmbagLength)
    .regex(ONLY_NUMBERS_REGEX, messages.jmbagOnlyNumbers)

export const phoneNumber = z
    .string()
    .min(1, messages.required)
    .max(25, messages.phoneMaxLength)
    .regex(CROATIAN_PHONE_REGEX, messages.invalidPhoneFormat)

export const password = z
    .string()
    .min(1, messages.required)
    .min(8, messages.passwordMinLength)
    .max(50, messages.passwordMaxLength)
    .regex(/[a-z]/, messages.passwordLowercase)
    .regex(/[A-Z]/, messages.passwordUppercase)
    .regex(/[0-9]/, messages.passwordNumber)

export const firstName = z
    .string()
    .min(1, messages.required)
    .max(45, messages.nameMaxLength)

export const lastName = z
    .string()
    .min(1, messages.required)
    .max(45, messages.surnameMaxLength)

export const oib = z
    .string()
    .min(1, { message: messages.required })
    .length(11, messages.oibLength)
    .regex(ONLY_NUMBERS_REGEX, messages.oibOnlyNumbers)

export const address = z
    .string()
    .min(1, { message: messages.required })
    .max(100, messages.addressMaxLength)

export const companyName = z
    .string()
    .min(1, { message: messages.required })
    .max(90, { message: messages.companyNameMaxLength })

export const verificationCode = z
    .string()
    .length(6, { message: messages.invalidCode })

export const rating = z
    .number()
    .int()
    .min(1)
    .max(5)

export const jobDescription = z
    .string()
    .max(500, messages.jobDescriptionMaxLength)

export const jobHourlyRate = z
    .number()
    .positive(messages.required)

export const maximumApprovedApplications = z
    .number()
    .int()
    .min(1)

export const jobTitle = z
    .string()
    .min(1, messages.required)
    .max(70, messages.jobTitleMaxLength)

export const stringDate = z.union([
    z.string().transform((dateString, context) => {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            context.addIssue({ code: z.ZodIssueCode.invalid_type, expected: 'Date' })
        }
        return date
    }),
    z.date().refine((date) => !isNaN(date.getTime()), { message: messages.invalidDate }),
])

export const studentSchema = z.object({
    email,
    password,
    firstName,
    lastName,
    jmbag,
    phoneNumber,
    address,
    universityId: z.string(),
})

export const employerSchema = z.object({
    email,
    password,
    companyName,
    oib,
    phoneNumber,
    address,
})

export const jobSchema = z.object({
    title: jobTitle,
    description: jobDescription,
    hourlyRate: jobHourlyRate,
    phoneNumber,
    startDate: stringDate,
    endDate: stringDate,
    startTime: stringDate,
    endTime: stringDate,
    categoryId: z.string(),
    closeDate: stringDate,
    maximumApprovedApplications,
    jobType: z.enum(['NORMAL', 'FAST']),
})

export const complaintSchema = z.object({
    title: z.string().min(1, messages.required).max(100),
    description: z.string().min(1, messages.required).max(1000),
    categoryId: z.string(),
    status: z.nativeEnum(ComplaintStatus).optional(),
})

export const createJobComplaintSchema = z.object({
    description: z.string().min(1, messages.required).max(1000),
    jobId: z.string().uuid(),
})