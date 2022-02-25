import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";
import JwksRsa, { JwksClient } from "jwks-rsa";
const cognitoValidationURL = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USERPOOL_ID}/.well-known/jwks.json`;
import {SigningKey ,TokenHeader } from "jwks-rsa";

const keyClient = new JwksClient({
    cache: true,
    cacheMaxAge: 86400000,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: cognitoValidationURL,
})

const verificationOptions:any = {
    'algorithms': 'RS256',
}

async function getSigingKey(header:any, next: any) {
    console.log(header.kid);
    
    /* keyClient.getSigningKey(header.kid, function(err:any, toke:JwksRsa.SigningKey){
        console.log("header.kid===>",header.kid);
        console.log("toke===>", toke);
        
       const signingkey = toke.getPublicKey()
       console.log(signingkey);
       
        next(null, signingkey);
      
    })*/
     console.log("Header.kid==>", header.kid);
    
    const key =await keyClient.getSigningKey(header.kid)
    console.log("key==>", key);
    

}

export const tokenValidator=(request:FastifyRequest, response:FastifyReply)=>{
    return new Promise((resolve, reject)=>{
        console.log("In tokenValidator");
        
        const authorization:string = request.headers.authorization as string
       // console.log("auth-->",request.headers.authorization);
        
        validateToken(authorization,request).then((decoded)=>{
           // request.decoded = decoded
           console.log("decoded",decoded);
           resolve(true)
        }).catch((error)=>{
            reject(error)
        })
        
    })
}

function validateToken(token:string, event:Object){
   return new Promise((resolve, reject)=>{
 
       jwt.verify(token,getSigingKey,verificationOptions,(err:any, decoded:any)=>{
         if(err){
             console.log("in veryfy",err);
             reject(err)
         }
         else{
             resolve(decoded)
         }
       })
   })
}
