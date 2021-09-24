import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;
  constructor(
    public deseoSvc: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id}`);

    }else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id}`);

    }

  }


  borrar( lista: Lista ) {
    this.deseoSvc.borrarLista(lista);

    console.log(lista);

  }


  async editarLista( lista: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.lista.closeSlidingItems();

          }
        },
        {
          text: 'Editar Lista',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseoSvc.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();

  }

}
