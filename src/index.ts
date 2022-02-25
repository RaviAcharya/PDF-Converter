import  fastify, { FastifyInstance }  from 'fastify';
import { fileRoute } from './routes/file-route'; 
import fastifyCors from 'fastify-cors';
const Port:string | number = process.env.PORT || 3000;
const server:FastifyInstance = fastify({logger :true})


server.register(fastifyCors)
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
