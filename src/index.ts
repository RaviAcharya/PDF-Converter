import { fastify } from 'fastify';
import { fileRoute } from './routes/file-route';
const Port = process.env.PORT || 3000;
const server = fastify({logger :true})

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