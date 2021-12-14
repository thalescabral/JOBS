import Queue from '../lib/Queue';

export default {

    async reenvioNotfisTMS(req, res) {
        const { pedido } = req.body;

        const reenvio = {
            pedido
        }

        //Add jobs na fila
        await Queue.add('ReenvioNotfis', { reenvio });


        return res.json(reenvio);
    }
};