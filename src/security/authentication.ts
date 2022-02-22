import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { tokenValidator } from "./tokenValidator";
const byPassedRoutes = {
    migration : "migration"
}

export const  validation = async(request:FastifyRequest, response:FastifyReply, done:any)=>{
        try{
            console.log("In token Validation");
            
            const validationTokenRequired:string=request.url;
            console.log("token",validationTokenRequired);
            const tokenValidationRequired:any=validateAndByPassRoutes(validationTokenRequired,response);
            if(tokenValidationRequired){
                 console.log("in if");
                await tokenValidator(request, response);
                 
                 response.status(401).send("UNAUTHORISED Request")
             }
             else{
              
            }

        }catch(error){
            response.status(401).send("UNAUTHORISED Request")
        }
}


export const validateAndByPassRoutes=async(originalUrl:string,response:FastifyReply)=>{
    try{
         if(originalUrl.includes(byPassedRoutes.migration)){
           return false;
         }
         else{
           return true;
         }
    }
    catch(error){
        response.status(401).send("UNAUTHORISED Request")
    }
    
 }
