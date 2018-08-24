import { Component, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Person } from '../../models/person';
import { RequestService } from '../../shared/services/request.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng/api';
import * as _ from 'lodash';
import {forEach} from '@angular/router/src/utils/collection';
import { ImageprocessService } from '../../shared/services/imageprocess.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  animations: [routerTransition()],
  providers: [RequestService, ImageprocessService]
})
export class PersonComponent implements OnInit {

  roles = [
    {id: 1, name: 'Director'},
    {id: 2, name: 'Assistant Director'},
    {id: 3, name: 'Cinematographer'},
    {id: 4, name: 'Camera Specialist'},
    {id: 5, name: 'Assistant Cameraman'},
    {id: 6, name: 'Focus Puller'},
    {id: 7, name: 'Data Wrangler'},
    {id: 8, name: 'Director of Art'},
    {id: 9, name: 'Director-1'},
    {id: 10, name: 'Public Relation Officer'},
    {id: 11, name: 'Drone Specialist'},
    {id: 12, name: 'Safety Specialist'},
    {id: 13, name: 'Logistics Specialist'},
    {id: 14, name: 'Clapper'},
    {id: 15, name: 'Technical Assistant'},
    {id: 16, name: 'Crew Assistant'},
    {id: 17, name: 'Actor-Actress'},
    {id: 18, name: 'Food Sponsor'}
  ];

  persons: Person[] = [];
  editperson: Person;
  showFormDialog: boolean;
  status_flag = 'Create';
  messages: Message[] = [];
  edittata = new EventEmitter<any>();
  constructor(private  api: RequestService,
              private  imgservice: ImageprocessService,
              private spinnerService: Ng4LoadingSpinnerService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.getAllData();
    this.showFormDialog = false;
    this.editperson = new Person();
  }

  getAllData() {
    this.api.getAllPerson().subscribe(res => {
      this.persons = res['data'];
      this.persons.forEach( person => {
        this.getImgurl(person);
        this.spinnerService.hide();
      });
    }, err => {
      console.log('err', err);
    });
  }

  getImgurl(person: Person) {
    if (person.personPhoto) {
      person.imageurl = this.imgservice.strTobase64(person.personPhoto);
    }
  }
  startCreate() {
    this.editperson = new Person();
    this.status_flag = 'Create';
    this.showFormDialog = true;
    this.edittata.emit({editperson: this.editperson});
  }
  startEdit(person: Person) {
    this.editperson = Object.assign({}, person);
    this.status_flag = 'Update';
    this.showFormDialog = true;
    this.edittata.emit({editperson: this.editperson});
  }
  onDeleteItem(person: Person) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.api.deletePerson(person.personId).subscribe(res => {
          this.persons = _.filter(this.persons, a => a.personId !== person.personId);
          this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Delete Success'});
        }, err => {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Delete failed'});
        });
      }
    });
  }
  onCancelEdit() {
    this.showFormDialog = false;
  }
  onUpdate(person: Person) {
    this.showFormDialog = false;
    this.messages = [];
    if (!person.personId) {
      this.api.addPerson(person).subscribe(res => {
        this.getAllData();
        this.persons.push(res['data']);
        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Create Success'});
      }, err => {
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Create failed'});
      });
    } else {
      const edited = _.find(this.persons, p => p.personId === person.personId);
      Object.assign(edited, person);
      this.api.updatePerson(person, person.personId).subscribe(res => {
        this.getAllData();
        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Update Success'});
      }, err => {
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Update failed'});
      });
    }
  }
}
