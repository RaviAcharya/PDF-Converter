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
exports.validateAndByPassRoutes = exports.validation = void 0;
const tokenValidator_1 = require("./tokenValidator");
const byPassedRoutes = {
    migration: "migration"
};
const validation = (request, response, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenValidationRequired = yield (0, exports.validateAndByPassRoutes)(request.url, response);
        if (tokenValidationRequired) {
            console.log("Inside validation");
            yield (0, tokenValidator_1.tokenValidator)(request, response);
            done();
        }
        else {
            done();
        }
    }
    catch (error) {
        response.status(401).send('Unauthorized Request');
    }
    ;
});
exports.validation = validation;
const validateAndByPassRoutes = (originalUrl, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (originalUrl.includes(byPassedRoutes.migration)) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        response.status(401).send("UNAUTHORISED Request");
    }
});
exports.validateAndByPassRoutes = validateAndByPassRoutes;
