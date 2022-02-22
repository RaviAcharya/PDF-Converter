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

interface DocIddata {
      docid : string
}
export const postController = async(request:FastifyRequest, response:FastifyReply)=>{
      try{
      const fileData:any = request.body
     // const fileType =request.body.fileDetails.fileType
     // const targetType = request.body.fileDetails.targetType
     // const fileName = request.body.fileDetails.fileName
     // console.log(fileName)
      //const result = await fileConverterService.converter(fileDetails.base as string, fileType, targetType, fileName)
     // response.send(result)
     
      const fileDataValue :FileData = fileData as FileData
      if(fileDataValue.fileDetails.base==undefined || fileDataValue.fileDetails.base==null || fileDataValue.fileDetails.base==""){
            let err:Error = Error("proper base value is required")
            throw err
      }
      if(fileDataValue.fileDetails.fileName==undefined || fileDataValue.fileDetails.fileName==null || fileDataValue.fileDetails.fileName==""){
            let err:Error = Error("proper fileName is required")
            throw err
            
      }
      if(fileDataValue.fileDetails.fileType==undefined || fileDataValue.fileDetails.fileType==null || fileDataValue.fileDetails.fileType==""){
            let err:Error = Error("proper fileType is required")
            throw err
      }
      if(fileDataValue.fileDetails.targetType==undefined || fileDataValue.fileDetails.targetType==null || fileDataValue.fileDetails.targetType==""){
            let err:Error = Error("proper targetType is required")
            throw err
      }
      const baseContent : string = fileDataValue.fileDetails.base
      const fileNameValue : string = fileDataValue.fileDetails.fileName
      const fileTypevalue : string = fileDataValue.fileDetails.fileType
      const targetTypevalue : string = fileDataValue.fileDetails.targetType 
      const result = await fileConverterService.converter(baseContent, fileTypevalue, targetTypevalue, fileNameValue)
      return result
      } catch(error){
           response.code(400).send(error)
      }
      //response.send(result)

}

export const getDocIdHandler = async(request:FastifyRequest, response:FastifyReply)=>{
      const docId = request.body
      const documentId:DocIddata = docId as DocIddata
      
}