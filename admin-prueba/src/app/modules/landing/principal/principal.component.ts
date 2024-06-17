import { Component, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

interface data {
    avatar:string;
    cantidadHoras:number;
    email:string;
    fecha:string;
    hora:string;
    name:string;
    servicios:[];
    valor:number;
}

@Component({
    selector     : 'landing-principal',
    templateUrl  : './principal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PrincipalComponent
{
    colaboradorSelected: Array<any>;
    filtroHoras = [ '8:00', '9:00', '10:00', '11:00'];
    serviciosColaborador: Array<any>;
    fechasesion:string = '';
    horaI:string = '';
    valorServicio: number = 0;
    serviciosSeleccionados: Array<any> = [];
    dataToSave: Array<any> = [];
    /**
     * Constructor
     */
    constructor()
    {
    }

    ngOnInit() {
        this.colaboradorSelected =  JSON.parse(localStorage.getItem('agendamiento'));
    }

    CalcularServicio(member:any,service:string, event:any){
        if(service.toLowerCase() === 'peluquería' && event.checked){
            member.valor = member.valor + 20000;
            member.services.push(service);
        } else if(service.toLowerCase() === 'peluquería' && !event.checked){
            member.valor = member.valor - 20000;
            member.servicios = member.servicios.filter( item => item.toLowerCase() !== service.toLowerCase());
        } else if(service.toLowerCase() === 'manicura' && event.checked){
            member.valor = member.valor  + 30000;
            member.services.push(service);
        } else if(service.toLowerCase() === 'manicura' && !event.checked){
            member.valor = member.valor - 30000;
            member.servicios = member.servicios.filter( item => item.toLowerCase() !== service.toLowerCase());
        } else if(service.toLowerCase() === 'barbería' && event.checked){
            member.valor = member.valor + 40000;
            member.services.push(service);
        } else if(service.toLowerCase() === 'barbería' && !event.checked){
            member.valor = member.valor - 40000;
            member.servicios = member.servicios.filter( item => item.toLowerCase() !== service.toLowerCase());
        } else if(service.toLowerCase() === 'depilación' && event.checked){
            member.valor = member.valor + 60000;
            member.services.push(service);
        } else if(service.toLowerCase() === 'depilación' && !event.checked){
            member.valor = member.valor - 60000;
            member.servicios = member.servicios.filter( item => item.toLowerCase() !== service.toLowerCase());
        }

        if(member.servicios.length === 0){
            this.colaboradorSelected = this.colaboradorSelected.filter(colaborador => colaborador.id !== member.id);
            localStorage.setItem('agendamiento', JSON.stringify(this.colaboradorSelected));
        }

    }

    Eliminar(member){
        this.colaboradorSelected = this.colaboradorSelected.filter(colaborador => colaborador.id !== member.id);
        localStorage.setItem('agendamiento', JSON.stringify(this.colaboradorSelected));
    }

    ReProgramAgendamiento(member:any){
        console.log(member);
        const data = {
            id: member.id,
            name: member.name,
            email: member.email,
            avatar: member.avatar,
            servicios: member.servicios,
            valor: member.valor,
            fecha: member.fecha,
            hora: member.hora,
            cantidadHoras: member.servicios.length
        }

        this.colaboradorSelected = this.colaboradorSelected.filter(colaborador => colaborador.id !== member.id)
        this.colaboradorSelected.push(data)
        localStorage.setItem('agendamiento', JSON.stringify(this.colaboradorSelected));
        location.reload();
    }
}
