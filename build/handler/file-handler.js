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
exports.getDocIdHandler = exports.postController = void 0;
const file_converter_service_1 = require("../service/file-converter-service");
//this handler gets the converted document and sends it in the response
const postController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileData = request.body;
        const fileDataValue = fileData;
        if (fileDataValue.fileDetails.base == undefined || fileDataValue.fileDetails.base == null || fileDataValue.fileDetails.base == "") {
            let err = Error("proper base value is required");
            throw err;
        }
        if (fileDataValue.fileDetails.fileName == undefined || fileDataValue.fileDetails.fileName == null || fileDataValue.fileDetails.fileName == "") {
            let err = Error("proper fileName is required");
            throw err;
        }
        if (fileDataValue.fileDetails.fileType == undefined || fileDataValue.fileDetails.fileType == null || fileDataValue.fileDetails.fileType == "") {
            let err = Error("proper fileType is required");
            throw err;
        }
        if (fileDataValue.fileDetails.targetType == undefined || fileDataValue.fileDetails.targetType == null || fileDataValue.fileDetails.targetType == "") {
            let err = Error("proper targetType is required");
            throw err;
        }
        const baseContent = fileDataValue.fileDetails.base;
        const fileNameValue = fileDataValue.fileDetails.fileName;
        const fileTypevalue = fileDataValue.fileDetails.fileType;
        const targetTypevalue = fileDataValue.fileDetails.targetType;
        const result = yield file_converter_service_1.fileConverterService.fileConverterService(baseContent, fileTypevalue, targetTypevalue, fileNameValue);
        return result;
    }
    catch (error) {
        response.code(500).send(error);
    }
});
exports.postController = postController;
//this handler gets the converted document and sends it in the response
const getDocIdHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerObject = request.headers;
        const docId = request.params;
        if (docId.documentId == null || docId.documentId == undefined) {
            //response.status(400).send("required proper documentId")
        }
        else {
            const result = yield file_converter_service_1.fileConverterService.fileConvertByIdService(headerObject, docId.documentId);
            response.status(200).send(result);
        }
    }
    catch (error) {
        response.status(500).send(error);
    }
});
exports.getDocIdHandler = getDocIdHandler;
