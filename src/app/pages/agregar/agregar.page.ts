import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(
    private deseosSvc: DeseosService,
    private router: ActivatedRoute
  ) {

    const listaId = router.snapshot.paramMap.get('listaId');
    this.lista= this.deseosSvc.obtenerLista(listaId);

    console.log(this.lista);

  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0 ) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem);
    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.deseosSvc.guardarStorage();
  }

  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items.filter( itemsData => !itemsData.completado).length;

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }


    this.deseosSvc.guardarStorage();

  }

  borrar( idx: number ) {
    this.lista.items.splice(idx, 1 );
    this.deseosSvc.guardarStorage();
  }

}
