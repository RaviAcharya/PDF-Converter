
import  {fileConverterService} from '../../service/file-converter-service'
import {postController} from '../../handler/file-handler'
import { FastifyReply, FastifyRequest } from 'fastify'
describe("running test for file-handler", ()=>{
    it("running test for post controller", async ()=>{
        //let bufferData:any = [0,1,2] ;
        let request:any = {"body":{"fileDetails" : {
            "base" : "jhwdc",
            "fileName" : "fastify",
            "fileType" : "jest",
            "targetType" : "nodejs"
      }}};
        let response:any = {}
        //let x:FastifyRequest = request as FastifyRequest
        //let y:FastifyReply = response as FastifyReply
        fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0,1,1,0])
        await postController(request , response)
        expect(fileConverterService.fileConverterService).toBeCalledTimes(1)
    }),
    it("running test for post controller", async ()=>{
        //let bufferData:any = [0,1,2] ;
        let request:any = {"body":{"fileDetails" : {
            "base" : "javascript",
            "fileName" : "fastify",
            "fileType" : "jest",
            "targetType" : "nodejs"
      }}};
        let response:any = {}
        //let x:FastifyRequest = request as FastifyRequest
        //let y:FastifyReply = response as FastifyReply
        fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0,1,1,0])
        await postController(request , response)
        expect(fileConverterService.fileConverterService).toBeCalledTimes(1)
    }),
     it("running test for post controller", async ()=>{
        //let bufferData:any = [0,1,2] ;
        let request:any = {"body":{"fileDetails" : {
            "base" : "",
            "fileName" : "fastify",
            "fileType" : "jest",
            "targetType" : "nodejs"
      }}};
        let response:any = {}
        //let x:FastifyRequest = request as FastifyRequest
        //let y:FastifyReply = response as FastifyReply
        fileConverterService.fileConverterService = jest.fn().mockResolvedValue([0,1,1,0])
        const res:any=await postController(request , response)
        console.log("In here",res)
        //expect(res.status).toBe(400)
        expect(fileConverterService.fileConverterService).toBeCalledTimes(0)
    })
})
