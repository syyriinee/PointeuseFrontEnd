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
  //private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  constructor() { }

  ngOnInit(): void {
  }

  // onChangeHour(event:any) {
  //   console.log('event', event);
  // }

  dataChanged(event: any) {
    this.itemChanged.emit(this.item);
  }

}
