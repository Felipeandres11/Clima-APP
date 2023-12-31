import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2'.green} Historial`
            },
            {
                value: 0,
                name: `${'3'.green} Salir`
            }
        ]    
    }
]

const inquirerMenu = async() => {
    console.log("=========================".green)
    console.log("==Seleccione una opción==".green)
    console.log("=========================".green)
    //Metodo que se ocupa para crear las preguntas
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log("\n")
    await inquirer.prompt(question)
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por Favor ingresa una descripción'
                }
                return true;
            }

        }
    ]
    const {descripcion} = await inquirer.prompt(question)
    return descripcion;
}

const listarLugares = async(lugares = []) => {


    const choices = lugares.map((lugar, contador) => {
        const counter = `${contador + 1}.`.green;

        return {
            value: lugar.id,
            name: `${counter} ${lugar.nombre}`
        }
    })
    
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)
    return id;

}

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, contador) => {
        const counter = `${contador + 1}.`.green;

        return {
            value: tarea.id,
            name: `${counter} ${tarea.descripcion}`,
            checked: (tarea.completadoEn === 'Completada' ? true : false)
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas)
    return ids;

}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question)
    return ok
}


export {inquirerMenu, pausa, leerInput, listarLugares, confirmar, mostrarListadoChecklist}