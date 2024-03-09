const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowDespedida = addKeyword(['Adios', 'Gracias']).addAnswer(['Con gusto, espero haberte ayudado 🙂'])

// Definir los flujos fuera del flujo principal
const flowGaming = addKeyword(['1']).addAnswer(['Gaming'])
const flowDiseño = addKeyword(['2']).addAnswer(['Diseño'])
const flowEdición = addKeyword(['3']).addAnswer(['Edicion'])
const flow3D = addKeyword(['4']).addAnswer(['3D'])
const flowMineria = addKeyword(['5']).addAnswer(['Mineria'])

const flowSaludo = addKeyword(['hola', 'alo'])
    .addAnswer(['Hola, bienvenido al asistente de recomendación para tarjetas gráficas.', '¿Cómo puedo ayudarte el día de hoy? 🙂', 'Dime en cuál de estos casos necesitas asistencia...'])
    .addAnswer(['Digite el número de la opción que corresponda a tu caso.\n1. Gaming.\n2. Diseño gráfico.\n3. Edición de video.\n4. Trabajo en 3D y Modelado.\n5. Minería de criptomonedas.'], { capture: true })
    .addAnswer('Ingrese la opción: ', { capture: true }, (ctx) => {
        const selectedOption = ctx.body.trim();
        switch (selectedOption) {
            case '1':
                ctx.flow('Gaming'); // Redirigir al flujo de gaming
                break;
            case '2':
                ctx.flow('Diseño'); // Redirigir al flujo de diseño
                break;
            case '3':
                ctx.flow('Edicion'); // Redirigir al flujo de edición
                break;
            case '4':
                ctx.flow('3D'); // Redirigir al flujo de modelado en 3D
                break;
            case '5':
                ctx.flow('Mineria'); // Redirigir al flujo de minería
                break;
            default:
                // Manejar caso de opción no válida
                ctx.sendText('Opción no válida. Por favor, seleccione un número válido.');
                break;
        }
    });

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSaludo, flowDespedida, flowGaming, flowDiseño, flowEdición, flow3D, flowMineria])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
