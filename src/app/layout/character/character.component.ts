import { Component, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Person } from '../../models/person';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  animations: [routerTransition()]
})
export class CharacterComponent implements OnInit {

  persons: Person[] = [];
  editperson: Person;
  showFormDialog: boolean;
  edittata = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.persons = [];
    this.showFormDialog = false;
    this.editperson = new Person();
  }
  startCreatePerson() {
    this.editperson = new Person();
    this.showFormDialog = true;
    this.edittata.emit({editperson: this.editperson});
  }
  onCancelEdit() {
    this.showFormDialog = false;
  }

  onUpdate(data: any) {
  
  }
}
