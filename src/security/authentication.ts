import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { tokenValidator } from "./tokenValidator";

const byPassedRoutes = {
    migration : "migration"
}

export const  validation = async(request:FastifyRequest, response:FastifyReply, done:any)=>{
    
            try {
                const tokenValidationRequired =await validateAndByPassRoutes(request.url, response);
                if (tokenValidationRequired) {
                    console.log("Inside validation");
                    
                  await tokenValidator(request,response);
                  done();
                } else {
                  done();
                }
              } catch (error) {
                response.status(401).send('Unauthorized Request');
              };
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