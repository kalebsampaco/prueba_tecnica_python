import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { ApiServiceHttp } from '@fuse/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService
{
    socket: any;
    readonly url: string = 'http://localhost:1337';
    welcome: Array<any> = [];
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _apiServiceHttp: ApiServiceHttp
    ){
        this.socket = io(this.url, {
          extraHeaders: {
            // eslint-disable-next-line @typescript-eslint/naming-convention, quotes
            'Authorization': `Bearer ${this._authService.accessToken}` // WARN: this will be ignored in a browser
          }
        });
    }


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    listen(eventName: string): any{
        return new Observable((subscriber) =>{
            const dataU = JSON.parse(sessionStorage.getItem('userData')) ?? '';
            const user = dataU.id;
            // this.socket.on(eventName, (data: any)=>{
            //     console.log(data)
            //     subscriber.next(data);
            // });
            this.socket.emit(eventName, { user }, (error) => { //Sending the username to the backend as the user connects.
                if (error) { return alert(error); }
            });
            this.socket.on('welcome', async (data: any, error: any) => {//Getting the welcome message from the backend
                const welcomeMessage = {
                user: data.user,
                message: data.text,
                };
                this.welcome.push(welcomeMessage);
                this._apiServiceHttp.get('messages').pipe(
                    switchMap((chats: any) =>
                            // let values = [];
                            // Return a new observable with the response
                            of(chats)
                    )
                ).subscribe((chats: any) => {
                    subscriber.next(chats);
                });
            });
        });
    }

    emit(eventName: string, dataMessage: any): any {

        this.socket.emit(eventName, dataMessage);
        return this._apiServiceHttp.post('messages', {data: dataMessage}).pipe(
            switchMap((chats: any) =>
                    of(chats)
            )
        );
    }

}
