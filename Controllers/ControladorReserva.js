import { ServidorReserva } from "../services/ServidorReserva.js"
import { ServicioHabitacion } from "../services/ServicioHabitacion.js"

export class ControladorReserva{

    constructor(){}

    async buscarReservas(request,response){
        let objetoServicioReservas = new ServidorReserva()

        try{
            response.status(200).json({
                "mensaje":"exito en la consulta "+idReserva,
                "datos":await objetoServicioReservas.buscarReservas(),

            })
        }catch(error){
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
    }

    buscarReservaPorId(request,response){

        let id = request.params.idReserva
        let objetoServicioReservas = new ServidorReserva()

        try{
            response.status(200).json({
                "mensaje":"Exito en la busqueda "+id, //recibo id de la peticion
                "datos":objetoServicioReservas.buscarReservaPorId(id)
                // "estado":true
            })
        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
        response.send("estoy buscando una Reservacion por id desde el controlador")
    }

    async registrarReserva(request,response){

        let datosReserva = request.body
        let objetoServicioReservas = new ServidorReserva()
        let objetoServicioHabitacion = new ServicioHabitacion()

        try{
            console.log(datosReserva)
            let habitacion = objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)
            if(datosReserva.idHabitacion == habitacion.idHabitacion){
                let numeroTotalPersonas = datosReserva.numeroAdultos + datosReserva.numeroNinos
                let numeroMaximoPersonas = habitacion.numeroMaximoPersonas
                if(numeroTotalPersonas <= numeroMaximoPersonas){
                    let  numeroTotalDias = datosReserva.fechaDeSalida - datosReserva.fechaDeEntrega
                    let costoTotal = habitacion.valorNoche * numeroTotalDias
                    console.log(numeroTotalDias)
                    console.log(costoTotal)
                    await objetoServicioReservas.agregarReservasEnBd(datosReserva)
                }
                else{
                    response.status(200).json({
                        "mensaje":"No se permiten tantas personas en la habitación",
                        "datos":datosReserva
                    })
                }
            }
            else{
                response.status(200).json({
                    "mensaje":"No se puede hacer esta reservacion, la habitación no existe.",
                    "datos":datosReserva
                })
            }
        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
        response.send("estoy agregando desde el controlador")
    }

    async editarReserva(request,response){

        let id = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReservas = new ServidorReserva()

        try{
            await objetoServicioReservas.editarHabitacion(id,datosReserva)
            response.status(200).json({
                "mensaje":"Exito editando "+id,
                "datos":null
                // "estado":true
            })
        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la consulta"+error,
                "datos":null
            })
        }
    }
    async eliminarReserva(request,response){

        let id = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReservas = new ServidorReserva()

        try{
            await objetoServicioReservas.eliminarHabitacion(id,datosReserva)
            response.status(200).json({
                "mensaje":"Exito eliminando "+id,
                "datos":null
                // "estado":true
            })
        }catch(error){  
            response.status(400).json({
                "mensaje":"Error en la eliminación"+error,
                "datos":null
            })
        }
    }
}