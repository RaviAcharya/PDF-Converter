import  fastify, { FastifyInstance }  from 'fastify';
import { fileRoute } from './routes/file-route'; 
import fastifyCors from 'fastify-cors';
import fastifyExpress from 'fastify-express';
import cors from 'cors'
import { stringify } from 'querystring';
const Port:string | number = process.env.PORT || 3000;
const server:FastifyInstance = fastify()
//server.register(fastifyExpress)
/*server.register(fastifyCors, {
  origin : "localhost:4000",
  methods : ["POST"]
})*/

/*server.register(fastifyCors, function (instance) {
     
    return (req, callback) => {
      let corsOptions;
      const origin = req.hostname
      console.log("origin",origin);
      
      // do not include CORS headers for requests from localhost
      if (origin==="localhost:4000") {
          console.log("true")
        corsOptions = { origin: true}
        callback(null, corsOptions)
      } else {
          console.log("false");
        corsOptions = { origin: false}
        callback(Error("Not allowed"),corsOptions)
      }
      console.log(corsOptions)
      callback(null, corsOptions) // callback expects two parameters: error and options
    }
  })
  
//server.register(fastifyExpress)
//server.use(cors(),console.log("Here"))*/
server.register(fileRoute)

const start = async () => {
    try {
        await server.listen(Port);
        console.log('Server started successfully');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();