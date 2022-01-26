import {build} from './helper'

describe('running test for file-route',()=>{
    const app = build()
    test('running test for fileRoute', async()=>{
        const res =await app.inject({
            method : "POST",
            url : "/files",
            payload : {"fileDetails" : {
                "base" : "hello",
                "fileName" : "fastify",
                "fileType" : "jest",
                "targetType" : "nodejs"
          }}
        })
        expect(res.payload)
    })
})