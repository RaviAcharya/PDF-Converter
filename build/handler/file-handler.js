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
const process_1 = require("process");
const file_converter_service_1 = require("../service/file-converter-service");
const postController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = request.body;
    // const fileType =request.body.fileDetails.fileType
    // const targetType = request.body.fileDetails.targetType
    // const fileName = request.body.fileDetails.fileName
    // console.log(fileName)
    //const result = await fileConverterService.converter(fileDetails.base as string, fileType, targetType, fileName)
    // response.send(result)
    const fileDataValue = fileData;
    console.log("In Handler");
    if (!fileDataValue.fileDetails.base) {
        let err = Error("base Cannot be null");
        response.code(400).send(err);
        (0, process_1.exit)(1);
    }
    if (!fileDataValue.fileDetails.fileName) {
        let err = Error("fileName Cannot be null");
        response.code(400).send(err);
        (0, process_1.exit)(1);
    }
    if (!fileDataValue.fileDetails.fileType) {
        let err = Error("fileType Cannot be null");
        response.code(400).send(err);
        (0, process_1.exit)(1);
    }
    if (!fileDataValue.fileDetails.targetType) {
        let err = Error("targetType Cannot be null");
        //response.code(400).send(err)
        (0, process_1.exit)(1);
    }
    const baseContent = fileDataValue.fileDetails.base;
    const fileNameValue = fileDataValue.fileDetails.fileName;
    const fileTypevalue = fileDataValue.fileDetails.fileType;
    const targetTypevalue = fileDataValue.fileDetails.targetType;
    const result = yield file_converter_service_1.fileConverterService.converter(baseContent, fileTypevalue, targetTypevalue, fileNameValue);
    console.log(result);
    //console.log("in handler")
    return result;
    //response.send(result)
});
exports.postController = postController;
