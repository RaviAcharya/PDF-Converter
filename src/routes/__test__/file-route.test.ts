import { fileConverterService } from '../../service/file-converter-service'
import {build} from './helper'
describe('running test for file-route',()=>{
    const app = build()
    test('running test for fileRoute', async()=>{
        fileConverterService.fileConverterService = jest.fn().mockResolvedValue(
           {bufferdata : "hello",
            fileName : "fastify",
            fileType : "pdf"}
        )
        const res =await app.inject({
            method : "POST",
            url : "/files",
            payload : {"fileDetails" : {
                "base" : "hello",
                "fileName" : "fastify",
                "fileType" : "jest",
                "targetType" : null
          }}
        })
        expect(res.statusCode).toBe(200)
        
    })
})