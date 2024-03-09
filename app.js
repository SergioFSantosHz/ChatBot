const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSaludo = addKeyword(['hola', 'alo']).addAnswer(['Hola, bienvenido al asistente de recomendación para tarjetas gráficas.', '¿Como puedo ayudarte el día de hoy? 🙂'])
const flowDespedida = addKeyword(['Adios', 'Gracias']).addAnswer(['Con gusto, espero fuera de tu ayuda 🙂'])

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSaludo, flowDespedida])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()