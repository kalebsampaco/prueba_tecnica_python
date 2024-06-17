/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';
import { WindowSizeService } from 'app/services/video/video.service';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-consejeria',
  templateUrl: './consejeria.component.html',
  styleUrl: './consejeria.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ConsejeriaComponent implements OnInit, OnDestroy {

    videoHeight: number;
    videoWidth: number;
    private resizeSubscription: Subscription;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    colaboradorSelected: Array<any>;
    filtroHoras = [ '8:00', '9:00', '10:00', '11:00'];
    serviciosColaborador: Array<any>;
    fechasesion: string = '';
    horaI: string = '';
    valorServicio: number = 0;
    serviciosSeleccionados: Array<any> = [];
    dataToSave: Array<any> = [];
    horizontalPosition : MatSnackBarHorizontalPosition = 'start' ;
    verticalPosition: MatSnackBarVerticalPosition = 'top' ;
    durationInSeconds = 5;
    step = 0;
    cursos: any = [];
    totalCursos:number;
    page: number = 1;
    pageCourse: number = 1;
    course: boolean = false;
    courses: boolean = false;
    courseSelected: any;
    totalAutors: number;
    autors: any = [];
    idAutor: number;
    materiales: any = [];
    mensaje: string = '';
    private _profile: any = JSON.parse(sessionStorage.getItem('userData')) ?? '';

    /**
     * Constructor
     */
    constructor(
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private _estudiandoService: EstudiandoService,
        private _snackBar: MatSnackBar,
        private windowSizeService: WindowSizeService,
    )
    {
    }

    ngOnInit() {
        this.resizeSubscription = this.windowSizeService.getWindowSize().subscribe(size => {
          this.updateVideoDimensions(size.width, size.height);
        });
        this.getAutors()
    }

     ngOnDestroy() {
        if (this.resizeSubscription) {
          this.resizeSubscription.unsubscribe();
        }
      }

      private updateVideoDimensions(windowWidth: number, windowHeight: number) {
        if (windowWidth < 600) { // Pequeñas pantallas
          this.videoWidth = windowWidth - 50; // Márgenes de 20px
          this.videoHeight = (this.videoWidth * 9) / 16; // Relación de aspecto 16:9
        } else if (windowWidth < 1400) { // Pantallas medianas
          this.videoWidth = windowWidth / 2;
          this.videoHeight = (this.videoWidth * 9) / 16;
        } else { // Pantallas grandes
          this.videoWidth = 700;
          this.videoHeight = (this.videoWidth * 9) / 16;
        }
      }

    getAutors(){
        const query = JSON.stringify({
              pagination: {
                page: this.page,
                pageSize: 10,
              },
            })
         const filter = 'filters[tipo_curso]=3'
        this._estudiandoService.getAutors(query, filter).subscribe((autors:any) =>{
            console.log(autors)
            this.autors = autors.data
            this.totalAutors = autors.meta.pagination.pageCount

        })
    }

    getCursos(id:number){
        const query = JSON.stringify({
              pagination: {
                page: this.pageCourse,
                pageSize: 10,
              },
            })
        this._estudiandoService.getCursos(query, id).subscribe((curso:any) =>{
            console.log(curso)
            this.cursos = curso.data
            this.totalCursos = curso.meta.pagination.pageCount

        })
    }

    goAutorCursos(autor:any){
        this.courses = true;
        this.idAutor = autor.id;
        this.getCursos(this.idAutor);
    }

    goCourse(curso:any){
        this.course = true;
        this.courses = false;
        this.courseSelected = curso;
        console.log(this.courseSelected.id)
        this._estudiandoService.getMaterialsCurso(this.courseSelected.id).subscribe((autors:any) =>{
            console.log(autors)
            this.materiales = autors.data
            console.log(this.materiales);
        });
    }

    validateBack(val1:boolean, val2:boolean){
        this.courses=val1;
        this.course=val2;
    }

    paginate(symbol): void {
        if(this.totalAutors <= 1){
            this._snackBar.open('No hay más paginación', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
        } else {
            switch (symbol) {
                case '+':
                    this.page++;
                    this.getAutors();
                    break;
                case '-':
                    if (this.pageCourse > 1) {
                        this.pageCourse--;
                        this.getAutors();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    paginatecourses(symbol): void {
        if(this.totalCursos <= 1){
            this._snackBar.open('No hay más paginación', '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: this.durationInSeconds * 1000,
                    });
        } else {
            switch (symbol) {
                case '+':
                    this.pageCourse++;
                    this.getCursos(this.idAutor)
                    break;
                case '-':
                    if (this.pageCourse > 1) {
                        this.pageCourse--;
                        this.getCursos(this.idAutor)
                    }
                    break;
                default:
                    break;
            }
        }
    }

    SendMessage(){
        const data = {
          data: {
            text: this.mensaje,
            user_id: this._profile.username,
            id_curso: `${this.courseSelected.id}`,
            curso: this.courseSelected.id
          }
        }
        this._estudiandoService.setMessage(data).subscribe((response:any) =>{
            this.getCursoById(this.courseSelected.id);
            this.mensaje = '';
        });
    }

    getCursoById(id:number){
        this._estudiandoService.getCursosById(id).subscribe((curso:any) =>{
             this.goCourse(curso.data);
        });
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

}
