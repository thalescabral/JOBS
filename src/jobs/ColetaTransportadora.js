//Thales.silva 30.10.2020

var fs = require('fs');

import Queue from '../lib/Queue';

//enviar email
export default {
    key: 'ColetaTransportadora',
    options: {
        attemps: 3,
        repeat: { cron: '0 0 6,1 ? * *' }, 
        timeout: 120000 
    },
    async handle({ data }) {

        const https = await require('http')

        const NumNota = 1


        try {



            const options1 = {
                    hostname: process.env.API_HOST_TMS,
                    port: 80,
                    path: process.env.API_ENVIO_COLETA_TMS,
                    method: 'GET',   
                    timeout: 120000
                }
                // console.log(options1);

            const req1 = https.request(options1, res1 => {
                // req1.timeout = 2000;
                var d1;

                res1.on("data", function(chunk) {
                    if (!d1) {
                        d1 = chunk;

                    } else {
                        d1 += chunk;
                    }
                });

                res1.on('end', function() {
                  
                        console.log("Email Enviado");
                       
                })
            })

            req1.on('error', error => {

                console.error(error)
                return promise.done(error, null);
            })

            req1.end()

        } catch (error) {

            throw new Error('error! ' + error);
        }


    }


}