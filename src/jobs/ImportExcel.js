import { parse } from 'path';
import { convertCompilerOptionsFromJson } from 'typescript';
const https = require('http')
var XLSX = require('xlsx');
var fs = require('fs')
import Queue from '../lib/Queue';
//var oneDriveAPI = require('onedrive-api');

//oneDriveAPI.items.listChildren({
//accessToken: 'eyJ0eXAiOiJKV1QiLCJub25jZSI6ImF2UzRVd1VXMmR1bmhqeGctVDk2cTBZNVhkRXBqWG1sSUVzc251YkhsaE0iLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kZWZmZDQxMi0zN2Y0LTRhZDItOTQ5OC02ZjFiNTlmMTc3N2YvIiwiaWF0IjoxNjA1ODA3ODc3LCJuYmYiOjE2MDU4MDc4NzcsImV4cCI6MTYwNTgxMTc3NywiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiRTJSZ1lIaVhtYlR1cDJmUHl2Qzd4WHJhLzVKODlVMCsyVE1GTTlhODkrOVFVT1cvSmdnQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiSk9CUyIsImFwcGlkIjoiNjMxMDEzYWItMDEwZC00MzM1LTk4OGEtYzZlNGZiMjE2Yzk3IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJSb2RyaWdvIENhYnJhbCBkYSBTaWx2YSIsImdpdmVuX25hbWUiOiJUaGFsZXMiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxNzcuMTkuMjA4LjIxOCIsIm5hbWUiOiJUaGFsZXMgUm9kcmlnbyBDYWJyYWwgZGEgU2lsdmEiLCJvaWQiOiJlMThiOTUwOC03NTQyLTQ2NGUtYTY1Yi00MGZiNWEyMThjZDkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjk5MDE3NTgtNTQzMTIyNjk2LTEzNDM5OTgyMTAtMzA2NjUiLCJwbGF0ZiI6IjE0IiwicHVpZCI6IjEwMDMyMDAwRUFCRjNCMzEiLCJyaCI6IjAuQUFBQUV0VF8zdlEzMGtxVW1HOGJXZkYzZjZzVEVHTU5BVFZEbUlyRzVQc2hiSmRGQUZZLiIsInNjcCI6InByb2ZpbGUgb3BlbmlkIGVtYWlsIiwic3ViIjoiUEotbnJPMmQ3Q2VmVHptTnJ1dE1RandfTjNPbzkzME1PcUFMcVphb0RTdyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJTQSIsInRpZCI6ImRlZmZkNDEyLTM3ZjQtNGFkMi05NDk4LTZmMWI1OWYxNzc3ZiIsInVuaXF1ZV9uYW1lIjoidGhhbGVzLnNpbHZhQGZlcnJlaXJhY29zdGEuY29tLmJyIiwidXBuIjoidGhhbGVzLnNpbHZhQGZlcnJlaXJhY29zdGEuY29tLmJyIiwidXRpIjoiaV9HNEcyOEJFRXlNVEtBVEpoTXNBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiIwNlk3WlFaczY3SlVNU2JBWk1FcFhPZ3lRZHd0UVJsdjJlR2QwX2ItcWVNIn0sInhtc190Y2R0IjoxNTcwNDcwMjA2fQ.BMaagFd9CH9qf62hW6cSUNsHNaGlKwSchG5CyPvzpdpe5RstzyYO48mlRf8Oa-lwzLZ5xbz7csYyrFNvOK84tq6YIs9JYYrmGE-7MZetvxXfBX3DYGsCp-T9Su4pcedDl_VHM-_sl-VdfTtQFkkVOuFLwHSUaUNR9NJY9st9iMdmiLSomTrEaSaVICHojKBssmvslgqPYtXXZlA2APL3FFDltCsKq0jlN7Q5nnnZN5VkWs_y3vHxqRNUtUBjYV6A98YKeVvI51ExUC85YxcWwxD-uGAg7T4zBmrcCUrvLx5D0GytktQqQAcFa47d8lOPkwkyBnqYDGvIff-AI5Rjhw',
// itemId: 'root',
// drive: 'user', // 'me' | 'user' | 'drive' | 'group' | 'site'
// driveId: 'e18b9508-7542-464e-a65b-40fb5a218cd9' // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
// }).then((childrens) => {
// list all children of given root directory
//
//  console.log(childrens);
// returns body of https://dev.onedrive.com/items/list.htm#response
// })

export default {
    key: 'ImportExcel',
    options: {
        timeout: 60000
            //delay: 5000,
            // attemps: 3,
            //  priority: 3,
            //  repeat: {
            //     every: 10000
            //  }
    },

    async handle({ data }) {



        const { user } = data;

        var nomeTransportadora = "";
        var listaEmail = "";
        var dataHoje = new Date();
        var dia = dataHoje.getDate().toString();
        var diaF = (dia.length == 1) ? '0' + dia : dia;
        var mes = (dataHoje.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0' + mes : mes;
        var anoF = dataHoje.getFullYear();
        var hora = dataHoje.getTime();


        try {

            //if (fs.existsSync('./uploads')) {
            //var rimraf = require("rimraf");
            // rimraf("./uploads/", function() { console.log("Excluindo pasta uploads..."); });
            //  await new Promise(r => setTimeout(r, 5000));
            //  }
            //if (!fs.existsSync('./uploads/')) {
            //  var mkdirp = require('mkdirp');
            //  mkdirp('./uploads/', function(err) {
            //       if (err) console.error(err)
            //      else console.log('Criando pasta uploads.!')
            //   });
            //  }

        } catch {
            console.log('Erro na criacao de pasta !')
        }

        try {

            fs.readdir('./imports/Aprocessar/', (err, data) => {
                if (data != null) {
                    var listFormatoIncorretoTXT = "";
                    var listErro = "";
                    var listObs = "";
                    var listProcessadosTXT = "";
                    var listErroDRTXT = "";
                    var listErroDNTXT = "";

                    var listObsTXT = "";
                    var pedidoErro = "";
                    var pedidoObservacao = "";
                    var cnpj = "";
                    var emailEnvio = "";
                    var emailCopia = "";
                    var cnpj = "";
                    var countTitulo = 0;
                    var countTitulo2 = 0;
                    var countTitulo3 = 0;

                    data.forEach(file => {

                        var workbook = XLSX.readFile(`./imports/Aprocessar/` + file);
                        var sheet_name_list = workbook.SheetNames;

                        sheet_name_list.forEach(function(y) {
                            var worksheet = workbook.Sheets[y];
                            var headers = {};
                            var data = [];
                            for (var z in worksheet) {
                                if (z[0] === '!') continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                };
                                var col = z.substring(0, tt);
                                var row = parseInt(z.substring(tt));
                                var value = worksheet[z].w;
                                // var value = worksheet[z].v;
                                //console.log(worksheet[z]);

                                if (row == 3 && value) {
                                    if (countTitulo == 0) {
                                        cnpj = value;
                                        if (cnpj == "10230480001960") {
                                            listaEmail = "thiago.garcia@ferreiracosta.com.br; arthur.costa@ferreiracosta.com.br; thales.silva@ferreiracosta.com.br; sandro.sales@ferreiracosta.com.br; gabriel.barros@ferreiracosta.com.br;   juarez.guimaraes@ferreiracosta.com.br;";
                                        } else {
                                            listaEmail = "ari.youssef@ferreiracosta.com.br; taina.dias@ferreiracosta.com.br;  paloma.wanderley@ferreiracosta.com.br; daniel.soares@ferreiracosta.com.br; cristiane.ferreira@ferreiracosta.com.br; arthur.costa@ferreiracosta.com.br; thales.silva@ferreiracosta.com.br; sandro.sales@ferreiracosta.com.br; gabriel.barros@ferreiracosta.com.br;   juarez.guimaraes@ferreiracosta.com.br;";
                                        }
                                    }
                                    if (countTitulo == 1) {
                                        nomeTransportadora = value;
                                    }
                                    countTitulo++;
                                }
                                if (row == 5 && value) {
                                    if (countTitulo2 == 0) {
                                        emailEnvio = value;
                                    }

                                    countTitulo2++;
                                }
                                if (row == 4 && value) {
                                    if (countTitulo3 == 0) {
                                        emailCopia = value;
                                    }

                                    countTitulo3++;
                                }


                                //store header names
                                if (row == 8 && value) {
                                    headers[col] = value;
                                    continue;
                                }

                                if (!data[row]) data[row] = {};
                                data[row][headers[col]] = value;

                                worksheet[z] = "";
                            }
                            //drop those first two rows which are empty
                            data.shift();
                            data.shift();

                            if (data.length == 0) {
                                listFormatoIncorretoTXT += "<tr> <td>  1 </td> <td> Verifique se foi realizado alguma alteração na planilha que enviamos que não seja (<b>DATA DE ENTREGA REALIZADA</b>, <b>NOVA DATA DE ENTREGA</b> ou <b>OBSERVAÇÃO</b>). </td>   </tr> "
                                listFormatoIncorretoTXT += "<tr> <td>  2 </td> <td> Verifique se o cabeçalho da planilha que enviamos foi removido.   </td>   </tr> "
                                listFormatoIncorretoTXT += "<tr> <td>  3 </td> <td> Verifique se alguma coluna da planilha que enviamos foi removida.   </td>   </tr> "
                                listFormatoIncorretoTXT += "<tr> <td>  4 </td> <td> Verifique se alguma coluna foi adicionada da planilha que enviamos.   </td>   </tr> "

                            }

                            data.forEach(element => {
                                var erro = false;
                                // console.log(element);
                                if (element != undefined) {
                                    if (element['PEDIDO'] != null) {


                                        if (undefined == element['OBSERVAÇÃO']) {
                                            element['OBSERVAÇÃO'] = "";
                                        }

                                        var patternData = /^(?:(?:(0?[1-9]|1\d|2[0-8])([-/.])(0?[1-9]|1[0-2]|j(?:an|u[nl])|ma[ry]|a(?:pr|ug)|sep|oct|nov|dec|feb)|(29|30)([-/.])(0?[13-9]|1[0-2]|j(?:an|u[nl])|ma[ry]|a(?:pr|ug)|sep|oct|nov|dec)|(31)([-/.])(0?[13578]|1[02]|jan|ma[ry]|jul|aug|oct|dec))(?:\2|\5|\8)(0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|(29)([-/.])(0?2|feb)\12(\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
                                        var dataR = element['DATA DE ENTREGA REALIZADA']
                                        if (undefined == dataR) {
                                            dataR = "";
                                        }


                                        if (dataR != null) {

                                            if (dataR.trim() == "") {
                                                dataR = "";
                                                listErroDRTXT += " &";
                                            } else {
                                                if (dataR.length != 10) {
                                                    try {
                                                        var dataRAux = dataR;
                                                        dataRAux = dataR.split('/');
                                                        var dataHoje = new Date();
                                                        var anoF = dataHoje.getFullYear();
                                                        dataR = dataRAux[0].padStart(2, '0') + "/" + dataRAux[1].padStart(2, '0') + "/" + anoF.toString().substring(0, 2) + dataRAux[2];
                                                        console.log("A data foi formatada para " + dataR);
                                                    } catch (e) {
                                                        console.log("A data NAO foi formatada para " + dataR);
                                                    }
                                                }
                                                if (!patternData.test(dataR)) {

                                                    listErro += "<tr> <td> " + element['FILIAL'] + "</td> <td>  " + element['PEDIDO'] + "</td>  <td> Data de entrega realizada (" + dataR + ") deve está no formato Dia/Mês/Ano e não pode conter texto.</br> Texto apenas no campo OBSERVAÇÃO. </td> </tr> "
                                                    listErroDRTXT += dataR + "&";
                                                    listObsTXT += element['OBSERVAÇÃO'] + "&";
                                                    //console.log(dataR + " Digite a data no formato Dia/Mês/Ano");
                                                    pedidoErro += element['PEDIDO'] + ',';

                                                    erro = true;
                                                } else {
                                                    dataR = dataR.replace('/', '-').replace('/', '-')
                                                        //var newDate = dataR.split('-');
                                                        //  dataR = newDate[1] + '/' + newDate[0] + '/' + newDate[2];
                                                }
                                            }

                                        } else {
                                            listErroDRTXT += " &";
                                        }
                                        patternData = /^(?:(?:(0?[1-9]|1\d|2[0-8])([-/.])(0?[1-9]|1[0-2]|j(?:an|u[nl])|ma[ry]|a(?:pr|ug)|sep|oct|nov|dec|feb)|(29|30)([-/.])(0?[13-9]|1[0-2]|j(?:an|u[nl])|ma[ry]|a(?:pr|ug)|sep|oct|nov|dec)|(31)([-/.])(0?[13578]|1[02]|jan|ma[ry]|jul|aug|oct|dec))(?:\2|\5|\8)(0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|(29)([-/.])(0?2|feb)\12(\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
                                        var dataN = element['NOVA DATA DE ENTREGA']
                                        if (undefined == dataN) {
                                            dataN = "";
                                        }


                                        if (dataN != null) {

                                            if (dataN.trim() == "") {
                                                dataN = "";
                                                listErroDNTXT += " &";
                                            } else {
                                                if (dataN.length != 10) {
                                                    try {
                                                        var dataNAux = dataN;
                                                        dataNAux = dataN.split('/');
                                                        var dataHoje = new Date();
                                                        var anoF = dataHoje.getFullYear();
                                                        dataN = dataNAux[0].padStart(2, '0') + "/" + dataNAux[1].padStart(2, '0') + "/" + anoF.toString().substring(0, 2) + dataNAux[2];
                                                        console.log("A data foi formatada para " + dataN);
                                                    } catch (e) {
                                                        console.log("A data NAO foi formatada para " + dataN);
                                                    }
                                                }
                                                if (!patternData.test(dataN)) {
                                                    listErro += "<tr> <td> " + element['FILIAL'] + "</td> <td>  " + element['PEDIDO'] + "</td>  <td>  Data nova de entrega (" + dataN + ") deve está no formato Dia/Mês/Ano e não pode conter texto.</br> Texto apenas no campo OBSERVAÇÃO.</td> </tr> "
                                                        //console.log(dataN + " Digite a data no formato Dia/Mês/Ano");
                                                    listErroDNTXT += dataN + "&";
                                                    listObsTXT += element['OBSERVAÇÃO'] + "&";
                                                    pedidoErro += element['PEDIDO'] + ',';

                                                    erro = true;
                                                } else {
                                                    dataN = dataN.replace('/', '-').replace('/', '-')
                                                        //  var newDate = dataN.split('-');
                                                        // dataN = newDate[1] + '/' + newDate[0] + '/' + newDate[2];
                                                }
                                            }
                                        } else {
                                            listErroDNTXT += " &";
                                        }

                                        if ((dataR == "" && dataN == "")) {
                                            if ((element['OBSERVAÇÃO'] != "" && element['OBSERVAÇÃO'] != null)) {
                                                listObs += "<tr> <td> " + element['FILIAL'] + "</td> <td>  " + element['PEDIDO'] + "</td>  <td>" + element['OBSERVAÇÃO'] + "</td> </tr> "
                                                listObsTXT += element['OBSERVAÇÃO'] + "&";
                                                // console.log("enviar email errro com obs" + element['OBSERVAÇÃO']);
                                                pedidoObservacao += element['PEDIDO'] + ',';

                                                erro = true;

                                            } else {
                                                listObsTXT += " &";
                                            }
                                        }

                                        if ((dataR == "" && dataN == "")) {
                                            if (element['OBSERVAÇÃO'] == "" || element['OBSERVAÇÃO'] == null) {
                                                listErro += "<tr> <td> " + element['FILIAL'] + "</td> <td>  " + element['PEDIDO'] + "</td>  <td> Dados não preenchido! </td> </tr> "
                                                listObsTXT += " &";
                                                // console.log("Tudo em branco! Pedido: " + element['PEDIDO']);
                                                pedidoErro += element['PEDIDO'] + ',';

                                                erro = true;
                                            }

                                        }


                                        if (erro == false) {
                                            //  console.log(erro);

                                            const obj = { email_enviado: "thales.silva@ferreiracosta.com.br", cod_empresa: parseInt(element['FILIAL'].split(" ")[0]), num_pedido: parseInt(element['PEDIDO']), dt_ent_realizada: dataR, dt_ent_repro: dataN, observacao: element['OBSERVAÇÃO'] }

                                            const dataJson = JSON.stringify(obj)

                                            // console.log("Processado: " + dataJson);

                                            const options = {
                                                hostname: process.env.API_HOST,
                                                port: 80,
                                                path: process.env.API_ENVIO_PROCESSAR,
                                                method: 'POST',
                                                timeout: 60000,
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Content-Length': dataJson.length
                                                }

                                            }

                                            const req = https.request(options, res => {

                                                if (res.statusCode == 200) {
                                                    res.on('data', d => {

                                                        console.log("Processado!" + dataJson)

                                                    })
                                                } else {

                                                    console.log("Erro!" + dataJson)

                                                }
                                            })

                                            req.on('error', error => {
                                                console.error(error)
                                                return promise.done(error, null);
                                            })

                                            listProcessadosTXT += "<tr> <td> " + element['FILIAL'] + "</td> <td>  " + element['PEDIDO'] + "</td>  <td> Processado com sucesso! </td> </tr> "

                                            req.write(dataJson)
                                            req.end()
                                        }


                                    }
                                } else {
                                    console.log("erro de leitura")
                                }

                            });


                            var dataHoje = new Date();
                            var dia = dataHoje.getDate().toString();
                            var diaF = (dia.length == 1) ? '0' + dia : dia;
                            var mes = (dataHoje.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
                            var mesF = (mes.length == 1) ? '0' + mes : mes;
                            var anoF = dataHoje.getFullYear();

                            if (listFormatoIncorretoTXT.length > 0) {
                                const user = {
                                    nomeTransportadora: nomeTransportadora,
                                    emailOrigem: process.env.MAIL_NOME,
                                    emailEnvio: emailEnvio,
                                    emailCopia: listaEmail,
                                    // emailCopia: 'thales.silva@ferreiracosta.com.br',
                                    // emailEnvio: 'thales.silva@ferreiracosta.com.br',
                                    QtdNota: 0,
                                    titulo: `[TRACKING] - Planilha com formato incorreto - ${diaF + "/" + mesF}`,
                                    html: ` 
                       

                            <html lang="en">
                            <head>
                            <meta charset="utf-8">
                            <title>Implement Sticky Header and Footer with CSS</title>
                            <style>
                               body {
                              font: normal medium/1.4 sans-serif;
                            }
                            table {
                              border-collapse: collapse;
                              width: 100%;
                            }
                            th, td {
                              padding: 0.25rem;
                              text-align: left;
                              border: 1px solid #ccc;
                            }
                            tbody tr:nth-child(odd) {
                              background: #eee;
                            }
                            </style>
                            </head>
                            <body>
                            Prezado(a),<br><br>
                           
                            Para facilitar o nosso processo de gestão da informação pedimos que retorne a planilha enviada preenchendo apenas os campos necessários e respeitando o padrão definido.  <br><br>
                               <table class="zebra"> 
                            <thead> 
                            <tr style="background-color:#fbc4c7" > 
                                <th colspan="3"  style='text-align: center; vertical-align: middle;' >Preenchimento incorreto </th> 
                               
                             
                            </tr>
                            <tr style="background-color:#000000; color:#ffffff"> 
                              
                                <th>Nº</th> 
                                <th>Possíveis problemas </th> 
                              
                             
                            </tr> 
                            </thead> 
                            <tbody> 
                            ${listFormatoIncorretoTXT}
                            
                            </tbody> 
                            
                            
                            </table> 
                            <br>
                            <br>
                                                                     
                            
                                                                        Atenciosamente.<br><br>
                            
                            Gestão de entregas<br>
                            Ferreira Costa<br>
                            
                            </body>
                            </html>

                          `,
                                    filename: file,
                                    path: `./imports/Aprocessar/` + file
                                }

                                //Add a fila para envio de email
                                Queue.add('RegistrationMail', { user }, 10000);
                            }

                            if (listProcessadosTXT.length > 0) {
                                //enviar email erro
                                const user = {
                                    nomeTransportadora: nomeTransportadora,
                                    emailOrigem: process.env.MAIL_NOME,

                                    emailEnvio: listaEmail,
                                    emailCopia: '',
                                    //emailCopia: 'thales.silva@ferreiracosta.com.br',
                                    //emailEnvio: 'thales.silva@ferreiracosta.com.br',
                                    QtdNota: 0,
                                    titulo: `[TRACKING] - Pedido processado com sucesso - ${nomeTransportadora} - ${diaF + "/" + mesF}`,
                                    html: ` 
                       

                            <html lang="en">
                            <head>
                            <meta charset="utf-8">
                            <title>Implement Sticky Header and Footer with CSS</title>
                            <style>
                               body {
                              font: normal medium/1.4 sans-serif;
                            }
                            table {
                              border-collapse: collapse;
                              width: 100%;
                            }
                            th, td {
                              padding: 0.25rem;
                              text-align: left;
                              border: 1px solid #ccc;
                            }
                            tbody tr:nth-child(odd) {
                              background: #eee;
                            }
                            </style>
                            </head>
                            <body>
                            Prezado(a),<br><br>
                            Segue relatório com o pedido processado com sucesso - <b> ${nomeTransportadora}</b> <br><br>
                               <table class="zebra"> 
                            <thead> 
                            <tr style="background-color:#A6EEBB" > 
                                <th colspan="3"  style='text-align: center; vertical-align: middle;' >Sucesso </th> 
                               
                             
                            </tr>
                            <tr style="background-color:#000000; color:#ffffff"> 
                              
                                <th>Filial</th> 
                                <th>Nº do Pedido</th> 
                                <th>Descrição</th> 
                             
                            </tr> 
                            </thead> 
                            <tbody> 
                            ${listProcessadosTXT}
                            
                            </tbody> 
                            
                            
                            </table> 
                            <br>
                            <br>
                                                                     
                            
                                                                        Atenciosamente.<br><br>
                            
                            Gestão de entregas<br>
                            Ferreira Costa<br>
                            
                            </body>
                            </html>

                          `,
                                    filename: file,
                                    path: `./imports/Aprocessar/` + file
                                }

                                //Add a fila para envio de email
                                Queue.add('RegistrationMail', { user }, 10000);
                            }

                            if (listErro.length > 0 || listObs.length > 0) {


                                if (pedidoErro != "") {

                                    const exportPlanilha = {
                                            cnpj: cnpj,
                                            emailEnviado: "",
                                            excel: "ERRO_" + file.substring(0, file.length - 5),
                                            NOME: nomeTransportadora,
                                            FL_ATIVO: "",
                                            //emailCopia: 'thales.silva@ferreiracosta.com.br',
                                            //emailEnvio: 'thales.silva@ferreiracosta.com.br',
                                            //VL_EMAIL_ENVIO: process.env.MAIL_NOME,
                                            //VL_EMAIL_COPIA: listaEmail,
                                            emailCopia: listaEmail,
                                            emailEnvio: listaEmail,
                                            VL_EMAIL_ORIGEM: "",
                                            pedido: pedidoErro.substring(0, pedidoErro.length - 1),
                                            listErroDR: listErroDRTXT,
                                            listErroDN: listErroDNTXT,
                                            obs: listObsTXT,
                                            delay: 0
                                        }
                                        //Criar excel
                                        //console.log(exportPlanilha);
                                    Queue.add('ExportExcel', { exportPlanilha }, undefined);

                                    console.log(emailEnvio)


                                    //enviar email erro
                                    const user = {
                                        nomeTransportadora: nomeTransportadora,
                                        emailOrigem: process.env.MAIL_NOME,
                                        emailEnvio: emailEnvio,
                                        emailCopia: listaEmail,
                                        //emailCopia: 'thales.silva@ferreiracosta.com.br',
                                        //emailEnvio: 'thales.silva@ferreiracosta.com.br',
                                        QtdNota: 0,
                                        titulo: `[TRACKING] - Pedido com erro para ajuste - ${nomeTransportadora} - ${diaF + "/" + mesF}`,
                                        html: ` 
                           

                                <html lang="en">
                                <head>
                                <meta charset="utf-8">
                                <title>Implement Sticky Header and Footer with CSS</title>
                                <style>
                                   body {
                                  font: normal medium/1.4 sans-serif;
                                }
                                table {
                                  border-collapse: collapse;
                                  width: 100%;
                                }
                                th, td {
                                  padding: 0.25rem;
                                  text-align: left;
                                  border: 1px solid #ccc;
                                }
                                tbody tr:nth-child(odd) {
                                  background: #eee;
                                }
                                </style>
                                </head>
                                <body>
                                Prezado(a),<br><br>
                                Segue relatório com o pedido em erro para ajuste, pedimos que preencha no formato correto e envie novamente - <b> ${nomeTransportadora}</b> <br><br>
                                   <table class="zebra"> 
                                <thead> 
                                <tr style="background-color:#fbc4c7" > 
                                    <th colspan="3"  style='text-align: center; vertical-align: middle;' >Erro </th> 
                                   
                                 
                                </tr>
                                <tr style="background-color:#000000; color:#ffffff"> 
                                  
                                    <th>Filial</th> 
                                    <th>Nº do Pedido</th> 
                                    <th>Descrição do Erro</th> 
                                 
                                </tr> 
                                </thead> 
                                <tbody> 
                                ${listErro}
                                
                                </tbody> 
                                
                                
                                </table> 
                                <br>
                                <br>
                                                                         
                                
                                                                            Atenciosamente.<br><br>
                                
                                Gestão de entregas<br>
                                Ferreira Costa<br>
                                
                                </body>
                                </html>

                              `,
                                        filename: "ERRO_" + file,
                                        path: `./uploads/` + "ERRO_" + file
                                    }

                                    //Add a fila para envio de email
                                    Queue.add('RegistrationMail', { user }, 10000);


                                }

                                if (pedidoObservacao != "") {

                                    const exportPlanilha = {
                                            cnpj: cnpj,
                                            emailEnviado: "",
                                            excel: "OBS_" + file.substring(0, file.length - 5),
                                            NOME: nomeTransportadora,
                                            FL_ATIVO: "",
                                            VL_EMAIL_ENVIO: "",
                                            VL_EMAIL_COPIA: "",
                                            VL_EMAIL_ORIGEM: "",
                                            pedido: pedidoObservacao.substring(0, pedidoObservacao.length - 1),
                                            obs: listObsTXT,
                                            delay: 0
                                        }
                                        //Criar excel
                                    console.log(exportPlanilha);
                                    // console.log(exportPlanilha);
                                    Queue.add('ExportExcel', { exportPlanilha }, undefined);


                                    //enviar planilha
                                    const options1 = {
                                        hostname: process.env.API_HOST,
                                        port: 80,
                                        path: process.env.API_CONFIG_EMAIL + 1,
                                        method: 'GET',
                                        timeout: 60000
                                    }


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

                                            r2.forEach(e => {
                                                console.log(e.EMAIL_NOTIFICACAO_TRACKING)

                                                const user = {
                                                    nomeTransportadora: nomeTransportadora,
                                                    emailOrigem: process.env.MAIL_NOME,
                                                    emailCopia: listaEmail,
                                                    emailEnvio: e.EMAIL_NOTIFICACAO_TRACKING,
                                                    //emailCopia: 'thales.silva@ferreiracosta.com.br',
                                                    //emailEnvio: 'thales.silva@ferreiracosta.com.br',
                                                    QtdNota: 0,
                                                    titulo: `[TRACKING] - Ocorrências para tratativa - ${nomeTransportadora} - ${diaF + "/" + mesF}`,
                                                    html: ` 
                                                   
                                            
                                           
                                            <html lang="en">
<head>
<meta charset="utf-8">
<title>Implement Sticky Header and Footer with CSS</title>
<style>
   body {
  font: normal medium/1.4 sans-serif;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
    padding: 0.25rem;
    text-align: left;
    border: 1px solid #ccc;
  }
tbody tr:nth-child(odd) {
  background: #eee;
}
</style>
</head>
<body>
Prezado(a),<br><br>
Segue relatório com o pedido em observação para tratativa - <b> ${nomeTransportadora}</b> <br><br>
   <table class="zebra"> 
<thead> 
<tr style="background-color:#fffcbb" > 
    <th colspan="3"  style='text-align: center; vertical-align: middle;' >Observação </th> 
   
 
</tr>
<tr style="background-color:#000000;color:#ffffff"> 
    <th>Filial</th> 
    <th>Nº do Pedido</th> 
    <th>Observação informada</th> 
 
</tr> 
</thead> 
<tbody> 
${listObs}

</tbody> 


</table> 
<br>
<br>
                                         

                                            Atenciosamente.<br><br>

Gestão de entregas<br>
Ferreira Costa<br>

</body>
</html>

                                          `,


                                                    filename: "OBS_" + file,
                                                    path: `./uploads/` + "OBS_" + file
                                                }

                                                //Add a fila para envio de email
                                                Queue.add('RegistrationMail', { user }, 10000);

                                            });
                                        })

                                    })


                                    req1.on('error', error => {
                                        console.error(error)
                                        return promise.done(error, null);
                                    })

                                    req1.end()


                                }



                            }
                        });

                    });
                }

            });

        } catch (error) {
            console.error(error)
            throw new Error('error! ' + error);

        }

        try {
            await new Promise(r => setTimeout(r, 30000));
            if (fs.existsSync('./imports/Aprocessar/')) {
                var rimraf = require("rimraf");
                rimraf("./imports/Aprocessar/", function() { console.log("Excluindo pasta Aprocessar..."); });
                await new Promise(r => setTimeout(r, 5000));
            }
            if (!fs.existsSync('./imports/Aprocessar/')) {
                var mkdirp = require('mkdirp');
                mkdirp('./imports/Aprocessar/', function(err) {
                    if (err) console.error(err)
                    else console.log('Criando pasta Aprocessar.!')
                });
            }

        } catch {
            console.log('Erro na criacao de pasta !')
        }



    }


}