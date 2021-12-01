//Thales.silva 30.10.2020

var fs = require('fs');

import Queue from '../lib/Queue';

//enviar email
export default {
    key: 'ExportExcel',
    options: {
        attempts: 5,
        timeout: 120000
            // delay: 5000
    },
    async handle({ data }) {

        try {

            if (data.exportPlanilha.delay != 0) {
                console.log(" daley " + data.exportPlanilha.delay);

            }
        } catch {
            console.log('Delay não informado !')
        }

        try {

            const https = await require('http')

            const NumNota = 1

            var dataHoje = new Date();
            var dia = dataHoje.getDate().toString();
            var diaF = (dia.length == 1) ? '0' + dia : dia;
            var mes = (dataHoje.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
            var mesF = (mes.length == 1) ? '0' + mes : mes;
            var anoF = dataHoje.getFullYear();

            //console.log(dAux);


            console.log(data.exportPlanilha);
            const options = {
                hostname: process.env.API_HOST,
                port: 80,
                path: process.env.API_EMAIL + data.exportPlanilha.cnpj + "&" + data.exportPlanilha.pedido,
                method: 'GET',
                timeout: 120000
            }
            console.log(options)
            const req = https.request(options, res => {
                req.timeout = 120000;



                var d = [];
                res.on('data', function(chunk) {
                    //  console.log(chunk);
                    if (!d) {
                        d = chunk;
                    } else {
                        d += chunk;
                    }
                })

                if (data != undefined) {



                    var nomeFormatado = "";
                    for (let index = 0; index < data.exportPlanilha.NOME.toString().length; index++) {
                        if (data.exportPlanilha.NOME.substr(index, 1) != "(" && data.exportPlanilha.NOME.substr(index, 1) != "-") {
                            nomeFormatado += data.exportPlanilha.NOME.substr(index, 1);
                        } else {
                            break;
                        }
                    }

                    // var  nomeFormatado = data.exportPlanilha.NOME;
                    // console.log(nomeFormatado);
                    // Require library
                    var excel = require('excel4node');

                    // Create a new instance of a Workbook class
                    var workbook = new excel.Workbook();

                    // Add Worksheets to the workbook
                    var worksheet = workbook.addWorksheet('Info Pedidos');
                    // var worksheet2 = workbook.addWorksheet('Sheet 2');

                    // Create a reusable style
                    var headerStyle = workbook.createStyle({
                        width: '360pt', // default 104pt
                        font: {
                            color: '#ffffff',
                            size: 9,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#000000",
                            fgColor: "#000000"
                        },
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center'
                        },
                        border: {

                            top: {
                                style: 'thin',
                                color: '000000'

                            },
                            right: {
                                style: 'thin',
                                color: '000000'

                            },
                            bottom: {
                                style: 'thin',
                                color: '000000'

                            },
                            left: {
                                style: 'thin',
                                color: '000000'

                            },
                            diagonal: {
                                style: 'thin',
                                color: '000000'

                            }
                        },

                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });

                    var headerLeganda = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 12,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#ffffff",
                            fgColor: "#ffffff"
                        },

                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });
                    var headerFC = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 16,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#ffffff",
                            fgColor: "#ffffff"
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });
                    var headerDATA = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 16,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#ffffff",
                            fgColor: "#ffffff"
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });
                    var headerOutros = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 10,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#ffffff",
                            fgColor: "#ffffff"
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });

                    var headerOutrosBranco = workbook.createStyle({
                        font: {
                            color: '#ffffff',
                            size: 10,
                            bold: true
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#ffffff",
                            fgColor: "#ffffff"
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });
                    var style = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 12,
                            left: 1.5,
                            right: 1.5
                        },
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center'
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#cccccc",
                            fgColor: "#ffffff"
                        },
                        border: {

                            top: {
                                style: 'thin',
                                color: '000000'

                            },
                            right: {
                                style: 'thin',
                                color: '000000'

                            },
                            bottom: {
                                style: 'thin',
                                color: '000000'

                            },
                            left: {
                                style: 'thin',
                                color: '000000'

                            },
                            diagonal: {
                                style: 'thin',
                                color: '000000'

                            }
                        }

                    });



                    var styleBlue = workbook.createStyle({
                        font: {
                            color: '#000000',
                            size: 12,
                            left: 1.5,
                            right: 1.5
                        },
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center'
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#cccccc",
                            fgColor: "#ffffff"
                        },
                        border: {

                            top: {
                                style: 'thin',
                                color: '000000'

                            },
                            right: {
                                style: 'thin',
                                color: '000000'

                            },
                            bottom: {
                                style: 'thin',
                                color: '000000'

                            },
                            left: {
                                style: 'thin',
                                color: '000000'

                            },
                            diagonal: {
                                style: 'thin',
                                color: '000000'

                            }
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#D9E1F2",
                            fgColor: "#D9E1F2"
                        },
                        numberFormat: '$#,##0.00; ($#,##0.00); -'
                    });

                    var styleBordaRed = workbook.createStyle({
                        border: {

                            top: {
                                style: 'thick',
                                color: 'red'
                            },

                            outline: false,
                        }

                    });

                    var styleBordaCinza = workbook.createStyle({

                        font: {
                            color: '#000000',
                            size: 10,
                            bold: true

                        },
                        border: {

                            top: {
                                style: 'thin',
                                color: '#808080'

                            },
                            right: {
                                style: 'thin',
                                color: '#808080'

                            },
                            bottom: {
                                style: 'thin',
                                color: '#808080'

                            },
                            left: {
                                style: 'thin',
                                color: '#808080'

                            },
                            diagonal: {
                                style: 'thin',
                                color: '#808080'

                            }
                        },
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center'
                        },

                    });




                    var createBorderBlue = workbook.createStyle({

                        border: {

                            top: {
                                style: 'thin',
                                color: 'CCCCCC'

                            },
                            right: {
                                style: 'thin',
                                color: 'CCCCCC'

                            },
                            bottom: {
                                style: 'thin',
                                color: 'CCCCCC'

                            },
                            left: {
                                style: 'thin',
                                color: 'CCCCCC'

                            },
                            diagonal: {
                                style: 'thin',
                                color: 'CCCCCC'

                            }
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#D9E1F2",
                            fgColor: "#D9E1F2"
                        }

                    });

                    var createBorderCinza = workbook.createStyle({

                        border: {

                            top: {
                                style: 'thin',
                                color: '000000'

                            },
                            right: {
                                style: 'thin',
                                color: '000000'

                            },
                            bottom: {
                                style: 'thin',
                                color: '000000'

                            },
                            left: {
                                style: 'thin',
                                color: '000000'

                            },
                            diagonal: {
                                style: 'thin',
                                color: '000000'

                            }
                        },
                        fill: {
                            type: "pattern",
                            patternType: "solid",
                            bgColor: "#CCCCCC",
                            fgColor: "#CCCCCC"
                        },
                        font: {
                            color: '#000000',
                            size: 9,
                            bold: true
                        },
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center'
                        }


                    });


                    //largura coluna
                    worksheet.column(1).setWidth(1);
                    worksheet.column(3).setWidth(15);
                    worksheet.column(5).setWidth(15);
                    worksheet.column(6).setWidth(12);
                    worksheet.column(8).setWidth(25);
                    worksheet.column(9).setWidth(17);
                    worksheet.column(10).setWidth(15);
                    worksheet.column(11).setWidth(15);

                    worksheet.column(13).setWidth(22);
                    worksheet.column(14).setWidth(22);
                    worksheet.column(15).setWidth(22);

                    //linha branca inicio
                    worksheet.cell(1, 1).string(" ").style(headerOutros);
                    worksheet.cell(2, 1).string(" ").style(headerOutros);
                    worksheet.cell(3, 1).string(data.exportPlanilha.cnpj).style(headerOutrosBranco);
                    worksheet.cell(4, 1).string(data.exportPlanilha.VL_EMAIL_COPIA).style(headerOutrosBranco);
                    worksheet.cell(5, 1).string(data.exportPlanilha.VL_EMAIL_ENVIO).style(headerOutrosBranco);
                    worksheet.cell(6, 1).string(" ").style(headerOutros);
                    worksheet.cell(7, 1).string(" ").style(headerOutros);

                    worksheet.row(1).setHeight(25);
                    worksheet.cell(1, 2, 1, 15, true).string("Ferreira Costa").style(headerFC);

                    worksheet.cell(2, 2, 2, 15, true).string("Acompanhamento Entregas").style(headerOutros);

                    worksheet.cell(3, 2, 3, 12, true).string(nomeFormatado).style(headerOutros);
                    worksheet.cell(3, 13, 3, 15, true).string("Legenda:").style(headerLeganda);

                    worksheet.cell(4, 2, 4, 12, true).string(" ").style(headerLeganda);
                    worksheet.cell(4, 13, 4, 13, true).string(" ").style(createBorderBlue);
                    worksheet.cell(4, 14, 4, 15, true).string(" - Campos a serem digitados").style(headerLeganda);

                    worksheet.row(5).setHeight(25);
                    worksheet.cell(5, 2, 5, 2, true).string("Dados de ").style(headerDATA);
                    worksheet.cell(5, 3, 5, 15, true).string(diaF + "/" + mesF + "/" + anoF).style(headerDATA);

                    worksheet.cell(6, 2, 6, 15, true).string(" ").style(styleBordaRed);

                    worksheet.row(7).setHeight(45);
                    worksheet.cell(7, 2, 7, 3, true).string("Filial de origem").style(styleBordaCinza);
                    worksheet.cell(7, 4, 7, 6, true).string("Dados do pedido").style(styleBordaCinza);
                    worksheet.cell(7, 7, 7, 8, true).string("Destino").style(styleBordaCinza);
                    worksheet.cell(7, 9, 7, 12, true).string("Prazos de entrega").style(styleBordaCinza);
                    worksheet.cell(7, 13, 7, 13, true).string("Já foi entregue? Insira a data da entrega realizada").style(styleBordaCinza);
                    worksheet.cell(7, 14, 7, 14, true).string("Não foi entregue? Insira a nova programação de entrega").style(styleBordaCinza);
                    worksheet.cell(7, 15, 7, 15, true).string("Outro status? Digite aqui").style(styleBordaCinza);

                    // worksheet.row(8).setHeight(20);
                    // console.log(`statusCode: ${res.statusCode}`)


                    var montarTitulo = true;
                    var linhaCount = 9;
                    var countNota = 0;
                    var linhaOBS = 0;
                    var linhaDR = 0;
                    var linhaDN = 0;
                    var delay = 20000;
                    res.on('end', function() {
                        try {
                            console.log(d);
                            if (true) {
                                var r = JSON.parse(d.replace(/^\ufeff/g, ""));
                                // console.log(r);
                                var i = 0;

                                r.forEach(element => {
                                    i++;
                                    //     console.log(element);
                                    var titulo = Object.keys(element);

                                    //Montar Titulo Planilha
                                    if (montarTitulo) {
                                        var cel = 2;


                                        titulo.forEach(t => {
                                            var formatacao = t.toString().split("_").join(" ");

                                            // console.log( t ); 
                                            if (cel == 13 || cel == 14) {
                                                worksheet.cell(8, cel).string(formatacao).style(createBorderCinza);
                                            } else {
                                                worksheet.cell(8, cel).string(formatacao).style(headerStyle);
                                            }

                                            cel++;
                                        });
                                    }
                                    montarTitulo = false;


                                    //Montar linha
                                    var linha = Object.values(element);
                                    var cel = 2;

                                    var obsAux = []
                                    var listErroDNTXTAux = []
                                    var listErroDRTXTAux = []
                                    if (data.exportPlanilha.obs != undefined && data.exportPlanilha.obs != "" && data.exportPlanilha.obs != null) {
                                        obsAux = data.exportPlanilha.obs.split("&")
                                    }
                                    if (data.exportPlanilha.listErroDN != undefined && data.exportPlanilha.listErroDN != "" && data.exportPlanilha.listErroDN != null) {
                                        listErroDNTXTAux = data.exportPlanilha.listErroDN.split("&")
                                    }
                                    if (data.exportPlanilha.listErroDR != undefined && data.exportPlanilha.listErroDR != "" && data.exportPlanilha.listErroDR != null) {
                                        listErroDRTXTAux = data.exportPlanilha.listErroDR.split("&")
                                    }


                                    linha.forEach(l => {
                                        // console.log( l ); 
                                        if (cel >= 13) {
                                            if (cel == 15) {
                                                if (data.exportPlanilha.obs != undefined && data.exportPlanilha.obs != "" && data.exportPlanilha.obs != null) {
                                                    worksheet.column(15).setWidth(110);
                                                    worksheet.cell(linhaCount, cel).string(obsAux[linhaOBS].toString()).style(createBorderBlue);

                                                } else if (l == null) {
                                                    // worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue).style({numberFormat: 'dd/mm/yyyy'});
                                                    worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue);
                                                } else {
                                                    // worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue).style({numberFormat: 'dd/mm/yyyy'});
                                                    worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue);
                                                }

                                            } else {
                                                if (cel == 14) {
                                                    if (data.exportPlanilha.listErroDN != undefined && data.exportPlanilha.listErroDN != "" && data.exportPlanilha.listErroDN != null) {
                                                        worksheet.column(14).setWidth(50);

                                                        worksheet.cell(linhaCount, cel).string(listErroDNTXTAux[linhaOBS].toString()).style(createBorderBlue);
                                                        // linhaDN++;
                                                    } else if (l == null) {
                                                        // worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue).style({numberFormat: 'dd/mm/yyyy'});
                                                        worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue).style({ numberFormat: 'dd/mm/yyyy;@', destinationTimeZone: 'Português (Brasil)' });
                                                    } else {
                                                        // worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue).style({numberFormat: 'dd/mm/yyyy'});
                                                        worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue).style({ numberFormat: 'dd/mm/yyyy;@', destinationTimeZone: 'Português (Brasil)' });
                                                    }
                                                }
                                                if (cel == 13) {

                                                    if (data.exportPlanilha.listErroDR != undefined && data.exportPlanilha.listErroDR != "" && data.exportPlanilha.listErroDR != null) {
                                                        worksheet.column(13).setWidth(50);

                                                        worksheet.cell(linhaCount, cel).string(listErroDRTXTAux[linhaOBS].toString()).style(createBorderBlue);
                                                        // linhaDR++;
                                                    } else if (l == null) {
                                                        //  worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue).style({ numberFormat: 'dd/mm/yyyy' });
                                                        worksheet.cell(linhaCount, cel).string(" " + "").style(createBorderBlue).style({ numberFormat: 'dd/mm/yyyy;@', destinationTimeZone: 'Português (Brasil)' });
                                                    } else {
                                                        // worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue).style({numberFormat: 'dd/mm/yyyy'});
                                                        worksheet.cell(linhaCount, cel).string(l + "").style(createBorderBlue).style({ numberFormat: 'dd/mm/yyyy;@', destinationTimeZone: 'Português (Brasil)' });
                                                    }
                                                }
                                            }

                                        } else {
                                            if (l == null) {
                                                worksheet.cell(linhaCount, cel).string(" " + "").style(style);
                                            } else {

                                                worksheet.cell(linhaCount, cel).string(l + "").style(style);
                                            }
                                        }
                                        cel++;

                                    });

                                    linhaOBS++;
                                    linhaCount++;
                                    countNota++;
                                    //  workbook.write(`./uploads/FC_${nomeFormatado}_${anoF + mesF + diaF}.xlsx`);
                                });
                                // workbook.writeToBuffer().then(function(buffer) {
                                if (data.exportPlanilha.pedido == "") {
                                    workbook.write(`./uploads/FC_${nomeFormatado}_${anoF + mesF + diaF}.xlsx`);
                                } else {
                                    workbook.write(`./uploads/${data.exportPlanilha.excel}.xlsx`);
                                }

                                if (countNota > 0 && data.exportPlanilha.pedido == "") {

                                    const user = {
                                        nomeTransportadora: nomeFormatado,
                                        emailOrigem: data.exportPlanilha.VL_EMAIL_ORIGEM,
                                        emailCopia: data.exportPlanilha.VL_EMAIL_COPIA,
                                        emailEnvio: data.exportPlanilha.VL_EMAIL_ENVIO,
                                        QtdNota: countNota,
                                        titulo: `[FC] - ${nomeFormatado} - ${diaF + "/" + mesF + "/" + anoF}`,
                                        html: `Prezado(a), <br><br>
        
                                Segue relatório com <b>${countNota}</b> pedidos em atraso da <b>${nomeFormatado}</b>. <br><br>

                                <b> ATENÇÃO! </b> <br>
                                Para facilitar o nosso processo de gestão da informação pedimos que retorne a planilha enviada preenchendo apenas os campos necessários e respeitando o padrão definido.<br><br>
                    
                                Favor responder este e-mail para  <b>${data.exportPlanilha.VL_EMAIL_ORIGEM}</b> com as informações solicitadas nas células indicadas em azul:<br><br>
                                
                                &nbsp; &nbsp; &nbsp; &nbsp; <b>1.</b> Já foi entregue? Insira a data da entrega realizada na coluna <b>M</b>; <br> 
                                &nbsp; &nbsp; &nbsp; &nbsp; <b>2.</b> Não foi entregue? Insira a nova data de programação de entrega na coluna <b>N</b>; <br> 
                                &nbsp; &nbsp; &nbsp; &nbsp; <b>3.</b> Outro status? Digite a observação na coluna <b>O</b>;  <br><br>
                                
                              

                                Desde já agradecemos a atenção e empenho na rápida resolução destas pendências.<br><br>

                                Atenciosamente.<br><br>

                                Gestão de entregas<br>
                                
                                Ferreira Costa
                    
                            `,
                                        filename: `FC_${nomeFormatado}_${anoF + mesF + diaF}.xlsx`,
                                        path: `./uploads/FC_${nomeFormatado}_${anoF + mesF + diaF}.xlsx`
                                    }

                                    //Add a fila para envio de email
                                    if (data.exportPlanilha.delayEmail != 0) {
                                        Queue.add('RegistrationMail', { user }, data.exportPlanilha.delayEmail);
                                    } else {
                                        Queue.add('RegistrationMail', { user });
                                    }

                                    delay += 20000;
                                }
                            } else {
                                console.log(d);
                                // throw error;
                            }
                        } catch (error) {
                            console.error('JSON data error', data, error)
                            return undefined; // Data was not valid JSON
                        }

                    })


                }

            })


            req.setTimeout(220000);
            req.on('timeout', function() {
                req.abort();
            });

            req.on('error', error => {
                if (!(error instanceof SyntaxError)) {
                    throw error; // rethrow (don't know how to deal with it)
                }
                console.error(error)
                throw error;
            })

            req.end()





        } catch (error) {
            if (!(error instanceof SyntaxError)) {
                throw error; // rethrow (don't know how to deal with it)
            }
            console.error(error)
            throw error;
        }





    }


}