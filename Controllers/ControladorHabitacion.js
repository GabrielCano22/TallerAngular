import {ServicioHabitacion} from '../services/ServicioHabitacion.js'

export class ControladorHabitacion{

    constructor(){}

    async buscarHabitaciones(request,response){

        let objetoServicioHabitacion=new ServicioHabitacion()

        try{

            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioHabitacion.buscarHabitaciones(),
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }

        
        
    }

    async buscarHabitacionPorId(request,response){
        let id=request.params.idHabitacion //recibo id de la peticion
        let objetoServicioHabitacion=new ServicioHabitacion()
        console.log('el id es: '+id)
        try{

            response.status(200).json({
                "mensaje":"exito en la consulta "+id,
                "datos":await objetoServicioHabitacion.buscarHabitacionPorId(id),
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }

    async registrarHabitacion(request,response){

        let datosHabitacion=request.body // OBTENGO DATOS DEL BODY
        let objetoServicioHabitacion=new ServicioHabitacion()
        
        try{
            console.log(datosHabitacion)
            if(datosHabitacion.numeroMaximoPersonas<=8){

                await objetoServicioHabitacion.agregarHabitacionEnBD(datosHabitacion)

                response.status(200).json({
                    "mensaje":"exito registrando habitacion",
                    "datos":null
                })

            }else{

                response.status(400).json({
                    "mensaje":"no caben tantas babys",
                    "datos":null
                })

            }

            
            
        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }

    async editarHabitacion(request,response){

        let id = request.params.idHabitacion
        let datosHabitacion = request.body

        let objetoServicioHabitacion=new ServicioHabitacion()
        console.log(id,datosEditar)

        try{

            await objetoServicioHabitacion.editarHabitacion(id,datosEditar)

            response.status(200).json({
                "mensaje":"exito editando a "+id,
                "datos":datosEditar,
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }
    async eliminarHabitacion(request,response){

        let id = request.params.idHabitacion
        let objetoServicioHabitacion=new ServicioHabitacion()
       
        try{

            await objetoServicioHabitacion.eliminarHabitacion(id)

            response.status(200).json({
                "mensaje":"Exito eliminando",
                "datos":null,
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"Error eliminando "+error,
                "datos":null,
            })

        }
    }


}