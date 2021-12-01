import Queue from '../lib/Queue';

export default {

    async planilhaImportTMS(req, res) {
        const { email, planilha } = req.body;

        const importPlanilha = {
            email,
            planilha,
        }

        //Add jobs na fila
        // await Queue.add('RegistrationMail', { ImportExcel });
        await Queue.add('ImportExcel', { importPlanilha });


        return res.json(importPlanilha);
    }
};