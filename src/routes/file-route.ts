import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import * as fileHanlder from '../handler/file-handler'
import cors from 'cors'

const todo = {
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

const putFileOpt = {
    schema: {
        body: todo,
        response: {
          200: {type : 'string'}
          },
        },

}

 export function fileRoute(fastify:FastifyInstance, options:any, done:any){
     fastify.addHook("onRequest", async()=>{
     fastify.use(cors())    
     })
     fastify.post('/files',putFileOpt, async(request:FastifyRequest, response:FastifyReply)=>{
       const result =  await fileHanlder.postController(request, response)
       response.send(result)
     })
     done()
 }
