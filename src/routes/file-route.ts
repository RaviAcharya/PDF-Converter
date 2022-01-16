import { FastifyBodyParser, FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import * as fileHanlder from '../handler/file-handler'
import {FromSchema} from "json-schema-to-ts"

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
    },
  },
  required: ["fileDetails"],
} as const;

const putFileOpt = {
    schema: {
        body: todo,
        response: {
          200: {
            type: 'string',
          },
        },
      }
}

 export function fileRoute(fastify:any, options:any, done:any){

     fastify.post('/files',putFileOpt, async(request:FastifyRequest, response:FastifyReply)=>{
       console.log("in route",request.body)
         await fileHanlder.postController(request, response)
     })
     done()
 }
