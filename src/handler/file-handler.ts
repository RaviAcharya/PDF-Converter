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
//this handler gets the converted document and sends it in the response
export const postController = async(request:FastifyRequest, response:FastifyReply)=>{
      try{
      const fileData:any = request.body
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
      const result = await fileConverterService.fileConverterService(baseContent, fileTypevalue, targetTypevalue, fileNameValue)
      return result
      } catch(error){
           response.code(500).send(error)
      }
}


interface IdocumentId {
      documentId : number
}
//this handler gets the converted document and sends it in the response
export const getDocIdHandler = async(request:FastifyRequest, response:FastifyReply)=>{
      try{
            const headerObject = request.headers
         const docId:IdocumentId = request.params as IdocumentId
         
      if(docId.documentId== null || docId.documentId== undefined)
      {
            //response.status(400).send("required proper documentId")
      }
      else{
            const result = await fileConverterService.fileConvertByIdService(headerObject,docId.documentId)
            response.status(200).send(result)
      }
      }catch(error){
            response.status(500).send(error)
      }
      
}