"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobComplaintSchema = exports.complaintSchema = exports.jobSchema = exports.employerSchema = exports.studentSchema = exports.gdprConsent = exports.stringDate = exports.jobTitle = exports.maximumApprovedApplications = exports.jobHourlyRate = exports.jobDescription = exports.rating = exports.verificationCode = exports.companyName = exports.address = exports.oib = exports.lastName = exports.firstName = exports.password = exports.phoneNumber = exports.jmbag = exports.email = exports.messages = void 0;
const zod_1 = require("zod");
const enums_1 = require("./enums");
const ONLY_NUMBERS_REGEX = /^\d+$/;
const CROATIAN_PHONE_REGEX = /^(?:\+385|0)(?:1|91|92|95|97|99|20|21|22|23|31|32|33|34|35|40|42|43|44|47|48|49|51|52|53|54|55|56|62|63|64|65|71|72|73|74|75|76|77|81|82|83|84|85|86|87|88|89)\d{6,7}$/;
exports.messages = {
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
    gdprConsentRequired: 'Suglasnost za obradu osobnih podataka je obvezna.',
};
exports.email = zod_1.z.string().min(1, exports.messages.required).max(45, exports.messages.emailMaxLength).email(exports.messages.invalidEmail);
exports.jmbag = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .length(10, exports.messages.jmbagLength)
    .regex(ONLY_NUMBERS_REGEX, exports.messages.jmbagOnlyNumbers);
exports.phoneNumber = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .max(25, exports.messages.phoneMaxLength)
    .transform((val) => val.replace(/[\s\-/()]/g, '').replace(/^\+385\(0\)/, '+385'))
    .pipe(zod_1.z.string().regex(CROATIAN_PHONE_REGEX, exports.messages.invalidPhoneFormat));
exports.password = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .min(8, exports.messages.passwordMinLength)
    .max(50, exports.messages.passwordMaxLength)
    .regex(/[a-z]/, exports.messages.passwordLowercase)
    .regex(/[A-Z]/, exports.messages.passwordUppercase)
    .regex(/[0-9]/, exports.messages.passwordNumber);
exports.firstName = zod_1.z.string().min(1, exports.messages.required).max(45, exports.messages.nameMaxLength);
exports.lastName = zod_1.z.string().min(1, exports.messages.required).max(45, exports.messages.surnameMaxLength);
exports.oib = zod_1.z
    .string()
    .min(1, { message: exports.messages.required })
    .length(11, exports.messages.oibLength)
    .regex(ONLY_NUMBERS_REGEX, exports.messages.oibOnlyNumbers);
exports.address = zod_1.z.string().min(1, { message: exports.messages.required }).max(100, exports.messages.addressMaxLength);
exports.companyName = zod_1.z.string().min(1, { message: exports.messages.required }).max(90, { message: exports.messages.companyNameMaxLength });
exports.verificationCode = zod_1.z.string().length(6, { message: exports.messages.invalidCode });
exports.rating = zod_1.z.number().int().min(1).max(5);
exports.jobDescription = zod_1.z.string().max(500, exports.messages.jobDescriptionMaxLength);
exports.jobHourlyRate = zod_1.z.number().positive(exports.messages.required);
exports.maximumApprovedApplications = zod_1.z.number().int().min(1);
exports.jobTitle = zod_1.z.string().min(1, exports.messages.required).max(70, exports.messages.jobTitleMaxLength);
exports.stringDate = zod_1.z.union([
    zod_1.z.null(),
    zod_1.z.string().transform((dateString, context) => {
        if (dateString === '')
            return null;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            context.addIssue({ code: zod_1.z.ZodIssueCode.custom, message: exports.messages.invalidDate });
            return zod_1.z.NEVER;
        }
        return date;
    }),
    zod_1.z.date().refine((date) => !isNaN(date.getTime()), { message: exports.messages.invalidDate }),
]);
exports.gdprConsent = zod_1.z.literal(true, { message: exports.messages.gdprConsentRequired });
exports.studentSchema = zod_1.z.object({
    email: exports.email,
    password: exports.password,
    firstName: exports.firstName,
    lastName: exports.lastName,
    jmbag: exports.jmbag,
    phoneNumber: exports.phoneNumber,
    address: exports.address,
    universityId: zod_1.z.string(),
    gdprConsent: exports.gdprConsent,
});
exports.employerSchema = zod_1.z.object({
    email: exports.email,
    password: exports.password,
    companyName: exports.companyName,
    oib: exports.oib,
    phoneNumber: exports.phoneNumber,
    address: exports.address,
    gdprConsent: exports.gdprConsent,
});
exports.jobSchema = zod_1.z.object({
    title: exports.jobTitle,
    description: exports.jobDescription,
    hourlyRate: exports.jobHourlyRate,
    phoneNumber: exports.phoneNumber,
    startDate: exports.stringDate,
    endDate: exports.stringDate,
    startTime: exports.stringDate,
    endTime: exports.stringDate,
    categoryId: zod_1.z.string(),
    closeDate: exports.stringDate,
    maximumApprovedApplications: exports.maximumApprovedApplications,
    jobType: zod_1.z.enum(['NORMAL', 'FAST']),
});
exports.complaintSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, exports.messages.required).max(100),
    description: zod_1.z.string().min(1, exports.messages.required).max(1000),
    categoryId: zod_1.z.string(),
    status: zod_1.z.nativeEnum(enums_1.ComplaintStatus).optional(),
});
exports.createJobComplaintSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, exports.messages.required).max(1000),
    jobId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=validation.js.map