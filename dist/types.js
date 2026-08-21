"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codebookTypeSchema = exports.userTypeSchema = void 0;
const zod_1 = require("zod");
exports.userTypeSchema = zod_1.z.enum(['employer', 'student']);
exports.codebookTypeSchema = zod_1.z.enum(['job-category', 'university']);
//# sourceMappingURL=types.js.map