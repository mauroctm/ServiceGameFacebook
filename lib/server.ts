import app from './app';
import * as cluster from "cluster";
import { cpus } from "os";
const PORT =process.env.PORT || 3000

const numCPUs = cpus().length;
if (cluster.isMaster) {
    console.log(`This machine has ${numCPUs} CPUs.`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });

} else {
    app.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    });
}
/*
app.listen(PORT, () => {
    
})*/