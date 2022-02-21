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
exports.tokenValidator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const jwks_rsa_1 = require("jwks-rsa");
const cognitoValidationURL = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USERPOOL_ID}/.well-known/jwks.json`;
const keyClient = new jwks_rsa_1.JwksClient({
    cache: true,
    cacheMaxAge: 86400000,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: cognitoValidationURL,
});
const verificationOptions = {
    'algorithms': 'RS256',
};
function getSigingKey(header, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // keyClient.getSigningKey(header.kid, function(err:any, toke:JwksRsa.SigningKey){
        //  console.log("header.kid===>",header.kid);
        //  console.log("toke===>", toke);
        //   const signingkey = toke.getPublicKey()
        //   console.log(signingkey);
        // next(null, signingKey);
        //})
        const key = yield keyClient.getSigningKey(header.kid);
        console.log("key==>", key);
    });
}
const tokenValidator = (request, response) => {
    return new Promise((resolve, reject) => {
        //console.log("In tokenValidator");
        const authorization = request.headers.authorization;
        console.log("auth-->", request.headers.authorization);
        validateToken(authorization, request).then((decoded) => {
            // request.decoded = decoded
            console.log("decoded", decoded);
            resolve(true);
        }).catch((error) => {
            reject(error);
        });
    });
};
exports.tokenValidator = tokenValidator;
function validateToken(token, event) {
    let signedKey = getSigingKey;
    return new Promise((resolve, reject) => {
        jwt.verify(token, signedKey, verificationOptions, (err, decoded) => {
            if (err) {
                console.log("in veryfy", err);
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
