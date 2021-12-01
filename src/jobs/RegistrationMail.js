import Mail from '../lib/Mail';

//enviar email
export default {
    key: 'RegistrationMail',
    options: {
        //  repeat: { cron: '0 55 11 ? * MON-FRI' }
        // delay: 1000,
        attempts: 5
    },
    async handle({ data }) {
        await Mail.sendMail({
            from: `${data.user.emailOrigem }`,
            cc: `${data.user.emailCopia}`,
            to: `${data.user.emailEnvio}`,
            subject: data.user.titulo,
            html: data.user.html,
            attachments: [{ // Basta incluir esta chave e listar os anexos
                filename: data.user.filename, // O nome que aparecerá nos anexos
                path: data.user.path // O arquivo será lido neste local ao ser enviado
            }]
        });
        console.log(data.user.nomeTransportadora);
        console.log("Enviado");
    }
}