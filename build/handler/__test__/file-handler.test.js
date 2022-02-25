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
const file_handler_1 = require("../../handler/file-handler");
describe("running test for file-handler", () => {
    it("running test for post controller", () => __awaiter(void 0, void 0, void 0, function* () {
        //let bufferData:any = [0,1,2] ;
        let request = { "body": { "fileDetails": {
                    "base": "jhwdc",
                    "fileName": "fastify",
                    "fileType": "jest",
                    "targetType": "nodejs"
                } } };
        let response = {};
        //let x:FastifyRequest = request as FastifyRequest
        //let y:FastifyReply = response as FastifyReply
        file_converter_service_1.fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0, 1, 1, 0]);
        yield (0, file_handler_1.postController)(request, response);
        expect(file_converter_service_1.fileConverterService.fileConverterService).toBeCalledTimes(1);
    })),
        it("running test for post controller", () => __awaiter(void 0, void 0, void 0, function* () {
            //let bufferData:any = [0,1,2] ;
            let request = { "body": { "fileDetails": {
                        "base": "javascript",
                        "fileName": "fastify",
                        "fileType": "jest",
                        "targetType": "nodejs"
                    } } };
            let response = {};
            //let x:FastifyRequest = request as FastifyRequest
            //let y:FastifyReply = response as FastifyReply
            file_converter_service_1.fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0, 1, 1, 0]);
            yield (0, file_handler_1.postController)(request, response);
            expect(file_converter_service_1.fileConverterService.fileConverterService).toBeCalledTimes(1);
        })),
        it("running test for post controller", () => __awaiter(void 0, void 0, void 0, function* () {
            //let bufferData:any = [0,1,2] ;
            let request = { "body": { "fileDetails": {
                        "base": "",
                        "fileName": "fastify",
                        "fileType": "jest",
                        "targetType": "nodejs"
                    } } };
            let response = {};
            //let x:FastifyRequest = request as FastifyRequest
            //let y:FastifyReply = response as FastifyReply
            file_converter_service_1.fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0, 1, 1, 0]);
            const res = yield (0, file_handler_1.postController)(request, response);
            console.log("In here", res);
            //expect(res.status).toBe(400)
            expect(file_converter_service_1.fileConverterService.fileConverterService).toBeCalledTimes(0);
        }));
});
