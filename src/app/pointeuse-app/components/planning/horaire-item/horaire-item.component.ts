import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Horaire } from '../../../models/planning.model';

@Component({
  selector: 'app-horaire-item',
  templateUrl: './horaire-item.component.html',
  styleUrls: ['./horaire-item.component.css']
})
export class HoraireItemComponent implements OnInit {

  @Input() item!: Horaire;
  @Output() itemChanged = new EventEmitter<Horaire>();

  constructor() { }

  ngOnInit(): void {
  }

  dataChanged(event: any) {
    this.itemChanged.emit(this.item);
  }

}
