const ambiente = process.argv[2];
console.log("Ambiente: " + ambiente);
if (ambiente == "master") {
    export default {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASS
    }
} else {
    export default {
        host: process.env.REDIS_HOST_DEV,
        port: process.env.REDIS_PORT_DEV,
        password: process.env.REDIS_PASS_DEV
    }
}