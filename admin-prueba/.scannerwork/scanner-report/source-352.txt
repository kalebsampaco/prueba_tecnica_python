import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';


import { PrayerS } from 'app/models/modelComunidad';
import { ComunidadService } from '../../../services/comunidad/comunidad.service';

@Injectable({
  providedIn: 'root',
})
export class PraysResolver  {
  /**
   * Constructor
   */
  constructor(private _praysService: ComunidadService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrayerS[]> {
    return this._praysService.getPrays();
  }
}



