"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_converter_service_1 = require("../../service/file-converter-service");
const helper_1 = require("./helper");
describe('running test for file-route', () => {
    const app = (0, helper_1.build)();
    test('running test for fileRoute', () => __awaiter(void 0, void 0, void 0, function* () {
        file_converter_service_1.fileConverterService.fileConverterService = jest.fn().mockResolvedValue({ bufferdata: "hello",
            fileName: "fastify",
            fileType: "pdf" });
        const res = yield app.inject({
            method: "POST",
            url: "/files",
            payload: { "fileDetails": {
                    "base": "hello",
                    "fileName": "fastify",
                    "fileType": "jest",
                    "targetType": null
                } }
        });
        expect(res.statusCode).toBe(200);
    }));
});
