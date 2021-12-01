import Queue from '../lib/Queue';

export default {

    async findtransportationTMSFC(req, res) {
        const { cnpj, emailEnviado, excel } = req.body;

        const transportation = {
            cnpj,
            emailEnviado,
            excel,
            FL_ATIVO,
            VL_EMAIL_ENVIO,
            VL_EMAIL_COPIA,
            VL_EMAIL_ORIGEM,
            NOME
        }

        //Add jobs na fila
        await Queue.add('FindTransportationFC', { transportation });


        return res.json(transportation);
    }
};