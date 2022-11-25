import { modeloReservas } from "../Models/Modeloreserva.js";

export class ServidorReserva {

    async buscarReservas(){
        let reservas = await modeloReservas.find()
        return reservas
    }

    async buscarReservaPorId(){
        let reserva = await modeloReservas.findById(id)
    }

    async agregarReservasEnBd(datos){
        let datosValidados = new modeloReservas(datos)
        return await datosValidados.save()
    }

    async editarReserva(id,datos){
        return await modeloReservas.findByIdAndUpdate(id,datos)
    }
}