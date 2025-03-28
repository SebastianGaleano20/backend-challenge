"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectQuery = exports.validateProject = exports.projectQuerySchema = exports.projectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.projectSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(100).required(),
    description: joi_1.default.string().max(500).optional(),
    status: joi_1.default.string().valid("IN_PROGRESS", "COMPLETED", "CANCELED"),
    Devs: joi_1.default.array()
        .items(joi_1.default.object({
        devId: joi_1.default.number().required(),
        role: joi_1.default.string().valid("MANAGER", "DEVELOPER").optional(),
    }))
        .optional(),
});
exports.projectQuerySchema = joi_1.default.object({
    page: joi_1.default.number().min(1).optional().default(1),
    limit: joi_1.default.number().min(1).max(100).optional().default(10),
    search: joi_1.default.string().optional(),
});
const validateProject = (data) => {
    return exports.projectSchema.validate(data);
};
exports.validateProject = validateProject;
const validateProjectQuery = (query) => {
    return exports.projectQuerySchema.validate(query);
};
exports.validateProjectQuery = validateProjectQuery;
