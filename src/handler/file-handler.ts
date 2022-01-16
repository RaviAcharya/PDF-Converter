import {FastifyReply, FastifyRequest } from 'fastify'
import {fileConverterService} from '../service/file-converter-service'

export const postController = async(request:any, response:any)=>{
      
     const fileDetails = request.body.fileDetails.base
     console.log(fileDetails)
      const fileType =request.body.fileDetails.fileType
      const convertType = request.body.convertType
      const result = await fileConverterService.converter(fileDetails)
      response.send(result)
      
     
}