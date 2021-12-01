import Queue from '../lib/Queue';

export default {

    async store(req, res) {
        const { nomeTransportadora, emailOrigem, emailCopia, emailEnvio, QtdNota, titulo, html, filename, path } = req.body;

        const user = {
            nomeTransportadora,
            emailOrigem,
            emailCopia,
            emailEnvio,
            QtdNota,
            titulo,
            html,
            filename,
            path
        }

        //Add jobs na fila
        await Queue.add('RegistrationMail', { user });
        // await Queue.add('ImportExcel', { user });


        return res.json(user);
    }
};