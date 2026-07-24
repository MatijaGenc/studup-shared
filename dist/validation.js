"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDate = exports.jobTitle = exports.maximumApprovedApplications = exports.jobHourlyRate = exports.jobDescription = exports.rating = exports.verificationCode = exports.companyName = exports.address = exports.oib = exports.lastName = exports.firstName = exports.password = exports.phoneNumber = exports.jmbag = exports.email = exports.messages = void 0;
const zod_1 = require("zod");
__exportStar(require("zod"), exports);
const ONLY_NUMBERS_REGEX = /^\d+$/;
exports.messages = {
    required: 'Polje je obvezno.',
};
exports.email = zod_1.z
    .string()
    .min(1, 'Polje je obvezno.')
    .max(45, 'Email mora sadržavati do 45 znakova.')
    .email('Email nije pravilnog formata.');
exports.jmbag = zod_1.z
    .string()
    .min(1, 'Polje je obvezno.')
    .length(10, 'JMBAG mora sadržavati 10 brojeva.')
    .regex(ONLY_NUMBERS_REGEX, 'JMBAG mora sadržavati samo brojeve.');
exports.phoneNumber = zod_1.z
    .string({ required_error: exports.messages.required })
    .min(1, exports.messages.required)
    .max(100, 'Broj mobitela mora sadržavati do 100 znakova.');
exports.password = zod_1.z
    .string()
    .min(1, 'Polje je obvezno.')
    .min(8, 'Lozinka mora sadržavati najmanje 8 znakova.')
    .max(50, 'Lozinka mora sadržavati do 50 znakova.')
    .regex(/[a-z]/, 'Lozinka mora sadržavati barem jedno malo slovo.')
    .regex(/[A-Z]/, 'Lozinka mora sadržavati barem jedno veliko slovo.')
    .regex(/[0-9]/, 'Lozinka mora sadržavati barem jedan broj.');
exports.firstName = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .max(45, 'Ime mora sadržavati do 45 znakova.');
exports.lastName = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .max(45, 'Prezime mora sadržavati do 45 znakova.');
exports.oib = zod_1.z
    .string()
    .min(1, { message: exports.messages.required })
    .length(11, 'OIB mora sadržavati 11 znakova.')
    .regex(ONLY_NUMBERS_REGEX, 'OIB mora sadržavati samo brojeve.');
exports.address = zod_1.z
    .string()
    .min(1, { message: exports.messages.required })
    .max(100, 'Adresa može sadržavati do 100 znakova.');
exports.companyName = zod_1.z
    .string()
    .min(1, { message: exports.messages.required })
    .max(90, { message: 'Ime mora sadržavati do 90 znakova.' });
exports.verificationCode = zod_1.z
    .string()
    .length(6, { message: 'Kod je neispravnog formata.' });
exports.rating = zod_1.z
    .number()
    .int()
    .min(1)
    .max(5);
exports.jobDescription = zod_1.z
    .string()
    .max(500, 'Opis posla mora sadržavati do 500 znakova.');
exports.jobHourlyRate = zod_1.z
    .number({ required_error: exports.messages.required })
    .positive();
exports.maximumApprovedApplications = zod_1.z
    .number()
    .int()
    .min(1);
exports.jobTitle = zod_1.z
    .string()
    .min(1, exports.messages.required)
    .max(70, 'Naslov posla može sadržavati do 70 znakova.');
exports.stringDate = zod_1.z.union([
    zod_1.z.string().transform((dateString, context) => {
        const date = new Date(dateString);
        if (!zod_1.z.date().safeParse(date).success) {
            context.addIssue({ code: zod_1.z.ZodIssueCode.invalid_date });
        }
        return date;
    }),
    zod_1.z.date(),
]);
//# sourceMappingURL=validation.js.map