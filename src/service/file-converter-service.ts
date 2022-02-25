import { getDocNameDetailsFromZixaServerUrl, getImageBufferFromZixaServerUrl } from "../rest/api-directory";
import axios from "axios";
import { fileConverter } from "./file-converter";

export interface IqueryParams {
    documentImageKey : string,
    type : string,
    typeId : number
}

class FileConverterService{
    //file Conversion service
    async fileConverterService(fileDetails:string, fileType:string, targetType:string, fileName:string) {
        try{
        const fileBuffer:Buffer = Buffer.from(fileDetails, 'base64')
        const pdfBuffer = await fileConverter(fileBuffer)
        const pdfArrayBuffer = pdfBuffer.toJSON()
        return pdfArrayBuffer;
        }catch(error){
            throw error
        }
    }
  
    //file conversion of a document based on documentId
    async fileConvertByIdService(headerObject:any, docId:any){
        try{

        const headers = {
            'authorization' : headerObject.authorization,
            'id' : headerObject.id
        }
        
        //getting the document details (documentImageKey, name, type, typeId, size)
        const documentData:any = await getDocumentDetails(headers,docId)

        //use this objects to get the document buffer
        const queryParams:IqueryParams = {
            documentImageKey : documentData.documentImageKey,
            type : documentData.type,
            typeId : documentData.typeId    
        }
        
        //get the buffer data by passing 'queryParams'  in this function
        const bufferData:Buffer = await getDocumentBuffer(headers,queryParams)

        //convert the document to pdf 
        const pdfBuffer:Buffer= await fileConverter(bufferData)
         
        // get the 'pdfBuffer' data in json format 
        let jsn = pdfBuffer.toJSON()
        
        const documentDetails = {
            documentBuffer : jsn,
            documentName : documentData.documentInformation.fileName,
            documentType : documentData.documentInformation.fileType,
            documentSize : documentData.documentInformation.fileSize
        }
        return documentDetails
      }catch(error){
          throw error
      }
        
    }
}

//this gets the buffer-format of a document
async function getDocumentBuffer(headers:any, queryParams:IqueryParams){
    try{
    
    // get the base url
    const url=getImageBufferFromZixaServerUrl()
    const newUrl = `${url}?imageId=${queryParams.documentImageKey}&type=${queryParams.type}&typeId=${queryParams.typeId}`

    //use previous 'newUrl' url to get the document-buffer using axios
    let documentResponse = await axios.get(newUrl,{headers:headers})
    const documentData = documentResponse.data.Body.data
    const bufferData = Buffer.from(documentData)
    return bufferData
    }catch(error){
        throw error
    }
}

//this function gets document-details
async function getDocumentDetails(headers:any,params:any){
    try{
        // get the base url
        const url = getDocNameDetailsFromZixaServerUrl()
        const newUrl = `${url}/${params}`
   
        //use previous 'newUrl' url to get the document-details using axios
        let documentResponse = await axios.get(newUrl, {headers:headers})
    
        const queryParams = {
           documentImageKey : documentResponse.data[0].documentImageKey,
           type : documentResponse.data[0].type,
           typeId : documentResponse.data[0].typeId,
           documentInformation : documentResponse.data[0].documentInformation
        }
        return queryParams
    }catch(error){
        throw error
    }
}

export let fileConverterService = new FileConverterService()