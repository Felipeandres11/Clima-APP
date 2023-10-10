import 'dotenv/config'
import {inquirerMenu, pausa, leerInput,  listarLugares, confirmar, mostrarListadoChecklist} from './helpers/inquirer.js'
import { Busquedas } from './models/busquedas.js';


// console.log(process.env.MAPBOX_KEY)

const main = async() => {
    const busquedas = new Busquedas();

    let opt;

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //MOSTRAR MENSAJE
                const lugar = await leerInput('Ciudad: ')
                 //BUSCAR LOS LUGARES
                const lugares = await busquedas.ciudad(lugar)
                 //SELECCIONAR EL LUGAR
                const id = await listarLugares(lugares)

                if(id === '0') continue;

                //guardar en DB
                const lugarSel = lugares.find( l => l.id === id)

                await busquedas.agregarHistorial(lugarSel.nombre)

                const tiempo = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
               
                //CLIMA 
                //MOSTRAR RESULTADOS
                console.log("\nInformación de la ciudad\n".green)
                console.log("Ciudad: ", lugarSel.nombre );
                console.log("Lat: ", lugarSel.lat );
                console.log("Lng: ", lugarSel.lng);
                console.log("Descripcion: ",tiempo.desc );
                console.log("Temperatura: ",tiempo.temp );
                console.log("Minima: ", tiempo.min);
                console.log("Maxima: ", tiempo.max);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${i + 1} .`.green
                    console.log(idx + lugar)
                })
            break;
            default:
                break;
        }


        
        
        if(opt !== 0) await pausa();

    }while(opt!==0)
}

main()