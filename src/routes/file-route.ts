import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import * as fileHanlder from '../handler/file-handler'
import { validation } from "../security/authentication";

//PayLoad data types for schema
const fileData = {
    type: 'object',
  properties: {
    fileDetails: {
      type : 'object',
      properties : {
        base : {type :"string"},
        fileName : {type : "string"},
        fileType : {type : "string"},
        targetType : {type : "string"},
    },
    required : ["base","fileName","fileType","targetType"]
    },
  },
  required : ["fileDetails"]
} as const;

//
const postFileOpt = {
    schema: {
        body: fileData,
        response: {
          200: {type : 'string'}
          },
        },

}

 export function fileRoute(fastify:FastifyInstance, options:any, done:any){
     fastify.addHook("preValidation", async(request:FastifyRequest, response:FastifyReply,done:any)=>{
       await validation(request,response,done)
     })

     fastify.post('/files',postFileOpt, async(request:FastifyRequest, response:FastifyReply)=>{
       const result =  await fileHanlder.postController(request, response)
       response.send(result)
     })
 }
