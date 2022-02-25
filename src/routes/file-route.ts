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

const paramsSchema = {
  type :'object',
  properties : {
     documentId : {type : 'number'}
  },
  required : ['documentId']
  
}

const docresponseSchema = {
  type : 'object',
  properties : {
    docBuffer : {type : 'object'},
    docName : {type : 'string'}
}
}
const getDocOpt = {
  schema : {
    params : paramsSchema,
}
}

 export function fileRoute(fastify:FastifyInstance, options:any, done:any){
     fastify.addHook("preValidation", async(request:FastifyRequest, response:FastifyReply,done:any)=>{
       //await validation(request,response,done)
     })

     fastify.post('/files',postFileOpt, async(request:FastifyRequest, response:FastifyReply)=>{
       const result =  await fileHanlder.postController(request, response)
       console.log(result);
       response.send(result)
     })
      
     fastify.get('/document-retrieval/byid/:documentId',getDocOpt, async (request:FastifyRequest, response:FastifyReply) => {
       await fileHanlder.getDocIdHandler(request,response)
     })
     done()
 }
