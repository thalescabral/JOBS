//Thales.silva 30.10.2020

var fs = require('fs');

import Queue from '../lib/Queue';

//enviar email
export default {
    key: 'FindTransportation',
    options: {
        attemps: 3,
       // repeat: { cron: '0 30 17 ? * MON-FRI' },
       repeat: { cron: 'XXXXXXXXXXXXX' },
        timeout: 999999
    },
    async handle({ data }) {

        const https = await require('http')

        const NumNota = 1

        try {

            if (fs.existsSync('./uploads')) {
                var rimraf = require("rimraf");
                rimraf("./uploads/", function() { console.log("Excluindo pasta uploads..."); });
                await new Promise(r => setTimeout(r, 5000));
            }
            if (!fs.existsSync('./uploads/')) {
                var mkdirp = require('mkdirp');
                mkdirp('./uploads/', function(err) {
                    if (err) console.error(err)
                    else console.log('Criando pasta uploads.!')
                });
            }

        } catch {
            console.log('Erro na criacao de pasta !')
        }
        try {

            var dataHoje = new Date();
            var dia = dataHoje.getDate().toString();
            var diaF = (dia.length == 1) ? '0' + dia : dia;
            var mes = (dataHoje.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
            var mesF = (mes.length == 1) ? '0' + mes : mes;
            var anoF = dataHoje.getFullYear();

            const options1 = {
                    hostname: process.env.API_HOST,
                    port: 80,
                    path: process.env.API_ENVIO_EMAIL,
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
                    var r2 = JSON.parse(d1);
                    // console.log(r2)
                    //Remover os repeditos
                    var dAux = [];
                    var r1 = [];
                    r2.forEach(e => {
                        if (dAux.length == 0) {

                            dAux.push(e.TRANSPORTADORA_CNPJ);
                            if (e.TRANSPORTADORA_CNPJ != '10230480001960') {
                                r1.push(e);
                            }
                        }

                        if (dAux.indexOf(e.TRANSPORTADORA_CNPJ) == -1) {
                            dAux.push(e.TRANSPORTADORA_CNPJ);
                            if (e.TRANSPORTADORA_CNPJ != '10230480001960') {
                                r1.push(e);
                            }
                        }
                    });
                    var delay = 5000;
                    var delayEmail = 5000;
                    r1.forEach(e => {
                        //console.log(e.TRANSPORTADORA_CNPJ);
                        const exportPlanilha = {
                            cnpj: e.TRANSPORTADORA_CNPJ,
                            emailEnviado: "",
                            excel: "",
                            NOME: e.NOME,
                            FL_ATIVO: e.FL_ATIVO,
                            VL_EMAIL_ENVIO: e.VL_EMAIL_ENVIO,
                            VL_EMAIL_COPIA: e.VL_EMAIL_COPIA,
                            VL_EMAIL_ORIGEM: e.VL_EMAIL_ORIGEM,
                            pedido: "",
                            delay: delay,
                            delayEmail: delayEmail
                        }

                        Queue.add('ExportExcel', { exportPlanilha }, delay);
                        delay += 5000;
                        delayEmail += 5000;
                    });



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