import 'dotenv/config';
import express from 'express';
import UserController from './controllers/UserController';
import ImportExcelController from './controllers/ImportExcelController';
import ExportExcelController from './controllers/ExportExcelController';
import FindTransportationController from './controllers/FindTransportationController';
import FindTransportationFCController from './controllers/FindTransportationFCController';
import ColetaTransportadoraController from './controllers/ColetaTransportadoraController';
import ReenvioNotfisController from './controllers/ReenvioNotfisController';
import BullBoard from 'bull-board';
import Queue from './lib/Queue';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';


const app = express();

app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static('src/public')) // Just for testing, use a static html

app.use('/', [
    require('./routes/fileupload')
])

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
app.post('/users', UserController.store);

app.post('/importExcel', ImportExcelController.planilhaImportTMS);

app.post('/exportExcel', ExportExcelController.planilhaExportTMS);

app.post('/FindTransportation', FindTransportationController.findtransportationTMS);

app.post('/FindTransportationFC', FindTransportationFCController.findtransportationTMSFC);

app.post('/ColetaTransportadora', ColetaTransportadoraController.coletaTransportadoraTMS);

app.post('/ReenvioNotfis', ReenvioNotfisController.reenvioNotfisTMS);

app.use('/admin/queues', BullBoard.UI);

app.listen(8080, () => {
    console.log('Server running on localhost:8080')
});

//Start job de export
const findtransportationTMS = {
    cnpj: "",
    emailEnviado: "",
    excel: ""
}
Queue.add('FindTransportation', { findtransportationTMS });

const findtransportationTMSFC = {
    cnpj: "",
    emailEnviado: "",
    excel: ""
}
Queue.add('FindTransportationFC', { findtransportationTMSFC });

const coletaTransportadora = {
    cnpj: ""
}
Queue.add('ColetaTransportadora', { coletaTransportadora });

const reenvioNotfis = {
    pedido: ""
}
Queue.add('ReenvioNotfis', { reenvioNotfis });