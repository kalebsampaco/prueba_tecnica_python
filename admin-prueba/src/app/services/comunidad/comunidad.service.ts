import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { ApiServiceHttp } from '@fuse/services/api.service';
import { PrayerS } from 'app/models/modelComunidad';

@Injectable()
export class ComunidadService
{
    private _prays: BehaviorSubject<PrayerS[] | null> = new BehaviorSubject(null);
    /**
     * Constructor
     */
    constructor(
        private _apiServiceHttp: ApiServiceHttp
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get prays$(): Observable<PrayerS[]> {
        return this._prays.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getPrays(): Observable<PrayerS[]> {
        const data = JSON.parse(sessionStorage.getItem('userData')) ?? '';

        // console.log(data.id);
        const oraciones = [];
        return this._apiServiceHttp.get('agenda-oracions').pipe(
            switchMap((prays: any) => {
                    // let values = [];
                    // Return a new observable with the response
                    prays = prays?.data?.filter((el: PrayerS) => el.attributes.idUser === Number(data.id));
                    // console.log(prays);
                    prays.forEach((el: PrayerS) => {
                        const value = {};
                        value['id'] = el.id;
                        value['email'] = data.email;
                        value['fechaFin'] = el.attributes.dateEnd;
                        value['fechaInicio'] = el.attributes.dateInit;
                        value['hora'] = el.attributes.hourInit;
                        value['horaF'] = el.attributes.HourEnd;
                        value['prayer'] = JSON.parse(el.attributes.motivo);
                        value['isChecked'] = el.attributes.allDays;

                        oraciones.push(value);
                        // console.log(oraciones);
                    });
                    return of(oraciones);
            })
        );
    }

    createPrays(body): Observable<PrayerS[]> {
        return this._apiServiceHttp.post('agenda-oracions', {data:body}).pipe(
            switchMap((prays: any) =>
                    // let values = [];
                    // Return a new observable with the response
                     of(prays)
            )
        );
    }

    changePrays(body: any, id: any): Observable<PrayerS[]> {
        return this._apiServiceHttp.put(`agenda-oracions/${id}`, {data:body}).pipe(
            switchMap((prays: any) =>
                    // let values = [];
                    // Return a new observable with the response
                     of(prays)
            )
        );
    }

    deletePray(id: any): Observable<PrayerS[]> {
        return this._apiServiceHttp.delete(`agenda-oracions/${id}`).pipe(
            switchMap((prays: any) =>
                    // let values = [];
                    // Return a new observable with the response
                     of(prays)
            )
        );
    }

}
