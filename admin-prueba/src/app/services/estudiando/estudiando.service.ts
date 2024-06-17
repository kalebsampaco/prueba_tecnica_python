import { Injectable } from '@angular/core';
import { ApiServiceHttp } from '@fuse/services/api.service';
import { estudio } from 'app/models/modelComunidad';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiandoService {
    private _estudios: BehaviorSubject<estudio[] | null> = new BehaviorSubject(null);

  constructor(
    private _apiServiceHttp: ApiServiceHttp
  ) { }

  /**
     * Getter for contact
     */
    get estudios$(): Observable<estudio[]> {
        return this._estudios.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getCursos(query:any, id:number): Observable<estudio[]> {
        return this._apiServiceHttp.get(`cursos?${query}&populate=*&filters[autor][id][$eq]=${id}`).pipe(
            switchMap((cursos: any) => {
                console.log(cursos)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(cursos);
            })
        );
    }

    getCursosById(id:number): Observable<estudio[]> {
        return this._apiServiceHttp.get(`cursos/${id}?populate=*`).pipe(
            switchMap((curso: any) => {
                    return of(curso);
            })
        );
    }

    getMaterialsCurso(id:number): Observable<estudio[]> {
        return this._apiServiceHttp.get(`materials?populate=*&filters[curso][id][$eq]=${id}`).pipe(
            switchMap((cursos: any) => {
                console.log(cursos)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(cursos);
            })
        );
    }

    getClientes(): Observable<any[]> {
        return this._apiServiceHttp.get('clientes').pipe(
            switchMap((clientes: any) => {
                console.log(clientes)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(clientes);
            })
        );
    }

    getProductos(): Observable<estudio[]> {
        return this._apiServiceHttp.get('productos').pipe(
            switchMap((prod: any) => {
                console.log(prod)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(prod);
            })
        );
    }

    createClientes(data:any) {

        return this._apiServiceHttp.post('clientes', data).pipe(
            switchMap((res: any) => {
                console.log(res);
                    return of(res);
            })
        );
    }

    createProduct(data:any) {

        return this._apiServiceHttp.post('productos', data).pipe(
            switchMap((res: any) => {
                console.log(res);
                    return of(res);
            })
        );
    }

    getVentas(): Observable<estudio[]> {
        return this._apiServiceHttp.get('ventas').pipe(
            switchMap((venta: any) => {
                console.log(venta)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(venta);
            })
        );
    }

    registerVenta(data:any) {

        return this._apiServiceHttp.post('registrar_cabecera', data).pipe(
            switchMap((res: any) => {
                console.log(res);
                    return of(res);
            })
        );
    }

    getAutors(query:any, filters:string): Observable<estudio[]> {
        return this._apiServiceHttp.get(`autors?${query}&populate=*&${filters}`).pipe(
            switchMap((cursos: any) => {
                console.log(cursos)
                    // let values = [];
                    // Return a new observable with the response
                    // prays = prays?.data?.filter((el: any) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    return of(cursos);
            })
        );
    }

    setMessage(data:any) {

        return this._apiServiceHttp.post('curso-chats', data).pipe(
            switchMap((res: any) => {
                console.log(res);
                    return of(res);
            })
        );
    }
}
