import {FastifyReply, FastifyRequest } from 'fastify'
import { exit } from 'process'
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
      
      const fileData:any = request.body
     // const fileType =request.body.fileDetails.fileType
     // const targetType = request.body.fileDetails.targetType
     // const fileName = request.body.fileDetails.fileName
     // console.log(fileName)
      //const result = await fileConverterService.converter(fileDetails.base as string, fileType, targetType, fileName)
     // response.send(result)
     
      const fileDataValue :FileData = fileData as FileData
      console.log("In Handler")
      if(!fileDataValue.fileDetails.base){
            let err:Error = Error("base Cannot be null")
            response.code(400).send(err)
            exit(1)
      }
      if(!fileDataValue.fileDetails.fileName){
            let err:Error = Error("fileName Cannot be null")
            response.code(400).send(err)
            exit(1)
      }
      if(!fileDataValue.fileDetails.fileType){
            let err:Error = Error("fileType Cannot be null")
            response.code(400).send(err)
            exit(1)
      }
      if(!fileDataValue.fileDetails.targetType){
            let err:Error = Error("targetType Cannot be null")
            //response.code(400).send(err)
            exit(1)
      }
      const baseContent : string = fileDataValue.fileDetails.base
      const fileNameValue : string = fileDataValue.fileDetails.fileName
      const fileTypevalue : string = fileDataValue.fileDetails.fileType
      const targetTypevalue : string = fileDataValue.fileDetails.targetType 
      const result = await fileConverterService.converter(baseContent, fileTypevalue, targetTypevalue, fileNameValue)
      console.log(result)
      //console.log("in handler")
      return result
      //response.send(result)

}