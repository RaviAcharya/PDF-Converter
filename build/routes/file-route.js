"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fileRoute = void 0;
const fileHanlder = __importStar(require("../handler/file-handler"));
//PayLoad data types for schema
const fileData = {
    type: 'object',
    properties: {
        fileDetails: {
            type: 'object',
            properties: {
                base: { type: "string" },
                fileName: { type: "string" },
                fileType: { type: "string" },
                targetType: { type: "string" },
            },
            required: ["base", "fileName", "fileType", "targetType"]
        },
    },
    required: ["fileDetails"]
};
//
const postFileOpt = {
    schema: {
        body: fileData,
        response: {
            200: { type: 'string' }
        },
    },
};
const paramsSchema = {
    type: 'object',
    properties: {
        documentId: { type: 'number' }
    },
    required: ['documentId']
};
const docresponseSchema = {
    type: 'object',
    properties: {
        docBuffer: { type: 'object' },
        docName: { type: 'string' }
    }
};
const getDocOpt = {
    schema: {
        params: paramsSchema,
    }
};
function fileRoute(fastify, options, done) {
    fastify.addHook("preValidation", (request, response, done) => __awaiter(this, void 0, void 0, function* () {
        //await validation(request,response,done)
    }));
    fastify.post('/files', postFileOpt, (request, response) => __awaiter(this, void 0, void 0, function* () {
        const result = yield fileHanlder.postController(request, response);
        console.log(result);
        response.send(result);
    }));
    fastify.get('/document-retrieval/byid/:documentId', getDocOpt, (request, response) => __awaiter(this, void 0, void 0, function* () {
        yield fileHanlder.getDocIdHandler(request, response);
    }));
    done();
}
exports.fileRoute = fileRoute;
