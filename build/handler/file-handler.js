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
exports.postController = void 0;
const file_converter_service_1 = require("../service/file-converter-service");
const postController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const fileDetails = request.body.fileDetails.base;
    console.log(fileDetails);
    const fileType = request.body.fileDetails.fileType;
    const convertType = request.body.convertType;
    const result = yield file_converter_service_1.fileConverterService.converter(fileDetails);
    response.send(result);
});
exports.postController = postController;
