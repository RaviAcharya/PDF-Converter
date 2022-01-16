import {FastifyReply, FastifyRequest } from 'fastify'
import {fileConverterService} from '../service/file-converter-service'

export const postController = async(request:any, response:any)=>{
      
      const fileDetails = request.body.fileDetails.base
      const fileType =request.body.fileDetails.fileType
      const targetType = request.body.fileDetails.targetType
      const fileName = request.body.fileDetails.fileName
      console.log(fileName)
      const result = await fileConverterService.converter(fileDetails, fileType, targetType, fileName)
      response.send(result)
      
}