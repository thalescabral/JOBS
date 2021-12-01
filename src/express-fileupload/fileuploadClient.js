const UPLOAD_FOLDER = './imports/Aprocessar' // Ensure that a folder called 'files' is created in the server root dir
import Queue from '../lib/Queue';
const fs = require('fs');
try {

    if (!fs.existsSync(UPLOAD_FOLDER)) {
        var mkdirp = require('mkdirp');
        mkdirp(UPLOAD_FOLDER, function(err) {
            if (err) console.error(err)
            else console.log('Criando pasta Aprocessar.!')
        });
    }

} catch {
    console.log('Erro na criacao de pasta !')
}
try {
    if (!fs.existsSync('./uploads/')) {
        var mkdirp = require('mkdirp');
        mkdirp('./uploads/', function(err) {
            if (err) console.error(err)
            else console.log('Criando pasta uploads.!')
        });
    }

} catch {
    console.log('Erro na criacao de pasta !')
}



// Upload a file
const uploadFile = file => {
    return new Promise((success, fail) => {
        // Use the mv() method to place the file somewhere on your server
        const fs = require('fs');
        const dir = UPLOAD_FOLDER;


        file.mv(`${UPLOAD_FOLDER}/${file.name}`, error => {
            if (error) fail(error)
            else {

                const importPlanilha = {
                    email: "",
                    planilha: "",
                }
                Queue.add('ImportExcel', { importPlanilha });

                success({ message: 'Arquivo importado com sucesso!' })


            }

        })

    })
}

module.exports = {
    uploadFile
}