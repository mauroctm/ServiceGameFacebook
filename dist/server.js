"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const cluster = require("cluster");
const os_1 = require("os");
const PORT = process.env.PORT || 3000;
const numCPUs = os_1.cpus().length;
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
}
else {
    app_1.default.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    });
}
/*
app.listen(PORT, () => {
    
})*/ 
//# sourceMappingURL=server.js.map