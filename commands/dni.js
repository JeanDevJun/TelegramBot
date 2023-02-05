const axios = require('axios');
module.exports = async (bot, msgId, mensaje) => {
    try {
        const getResponse = await axios.get(`https://api.apis.net.pe/v1/dni?numero=${mensaje}`);
        const response = getResponse.data;
        bot.sendMessage(msgId, `-> DATOS DEL USUARIO <- \n[>] NOMBRE COMPLETO: ${response.nombre}\n[>] DNI: ${response.numeroDocumento}`);
    } catch (error) {
        console.log(error.response.data);
        bot.sendMessage(msgId, `No hay Datos para el usuario!`);
    }
}