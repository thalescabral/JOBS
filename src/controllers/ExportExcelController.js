import Queue from '../lib/Queue';

export default {

    async planilhaExportTMS(req, res) {
        const { cnpj, emailEnviado, excel } = req.body;

        const exportPlanilha = {
            cnpj,
            emailEnviado,
            excel
        }


        await Queue.add('ExportExcel', { exportPlanilha });


        return res.json(exportPlanilha);
    }
};