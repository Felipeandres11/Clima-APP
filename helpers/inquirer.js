import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2'.green} Listar Tarea`
            },
            {
                value: '3',
                name: `${'3'.green} Listar Tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green} Completar Tareas`
            },
            {
                value: '6',
                name: `${'6'.green} Borrar Tareas`
            },
            {
                value: '0',
                name: `${'7'.green} Salir`
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

const listadoTareasBorrar = async(tareas = []) => {


    const choices = tareas.map((tarea, contador) => {
        const counter = `${contador + 1}.`.green;

        return {
            value: tarea.id,
            name: `${counter} ${tarea.descripcion}`
        }
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

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


export {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist}