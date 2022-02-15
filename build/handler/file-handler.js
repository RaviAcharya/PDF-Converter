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
    try {
        const fileData = request.body;
        // const fileType =request.body.fileDetails.fileType
        // const targetType = request.body.fileDetails.targetType
        // const fileName = request.body.fileDetails.fileName
        // console.log(fileName)
        //const result = await fileConverterService.converter(fileDetails.base as string, fileType, targetType, fileName)
        // response.send(result)
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
        const result = yield file_converter_service_1.fileConverterService.converter(baseContent, fileTypevalue, targetTypevalue, fileNameValue);
        return result;
    }
    catch (error) {
        response.code(400).send(error);
    }
    //response.send(result)
});
exports.postController = postController;
