import {FastifyReply, FastifyRequest } from 'fastify'
import {fileConverterService} from '../service/file-converter-service'

interface FileData {
   fileDetails : {
         base : string,
         fileName : string,
         fileType : string,
         targetType : string
   }
}

export const postController = async(request:FastifyRequest, response:FastifyReply)=>{
      
      const fileData:unknown = request.body
     // const fileType =request.body.fileDetails.fileType
     // const targetType = request.body.fileDetails.targetType
     // const fileName = request.body.fileDetails.fileName
     // console.log(fileName)
      //const result = await fileConverterService.converter(fileDetails.base as string, fileType, targetType, fileName)
     // response.send(result)
      const fileDataValue :FileData = fileData as FileData
      const baseContent : string = fileDataValue.fileDetails.base
      const fileNameValue : string = fileDataValue.fileDetails.fileName
      const fileTypevalue : string = fileDataValue.fileDetails.fileType
      const targetTypevalue : string = fileDataValue.fileDetails.targetType 
      const result = await fileConverterService.converter(baseContent, fileTypevalue, targetTypevalue, fileNameValue)
      response.send(result)

}