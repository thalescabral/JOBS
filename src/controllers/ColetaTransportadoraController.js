import Queue from '../lib/Queue';

export default {

    async coletaTransportadoraTMS(req, res) {
        const { cnpj } = req.body;

        const coleta = {
            cnpj
        }

        //Add jobs na fila
        await Queue.add('ColetaTransportadora', { coleta });


        return res.json(coleta);
    }
};