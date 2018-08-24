import { Component, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Person } from '../../models/person';
import { RequestService } from '../../shared/services/request.service';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng/api';
import * as _ from 'lodash';
import {forEach} from '@angular/router/src/utils/collection';
import { ImageprocessService } from '../../shared/services/imageprocess.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  animations: [routerTransition()],
  providers: [RequestService, ImageprocessService]
})
export class PersonComponent implements OnInit {
  persons: Person[] = [];
  editperson: Person;
  showFormDialog: boolean;
  status_flag = 'Create';
  messages: Message[] = [];
  edittata = new EventEmitter<any>();
  constructor(private  api: RequestService,
              private  spinner: NgxSpinnerService,
              private  imgservice: ImageprocessService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.spinner.show();
    this.getAllData();
    this.showFormDialog = false;
    this.editperson = new Person();
  }

  getAllData() {
    this.api.getAllPerson().subscribe(res => {
      this.persons = res['data'];
      this.persons.forEach( person => {
        this.getImgurl(person);
      });
      this.spinner.hide();
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
        this.spinner.show();
        this.api.deletePerson(person.personId).subscribe(res => {
          this.spinner.hide();
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
    this.spinner.show();
    if (!person.personId) {
      this.api.addPerson(person).subscribe(res => {
        this.spinner.hide();
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
        this.spinner.hide();
        this.getAllData();
        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Update Success'});
      }, err => {
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Update failed'});
      });
    }
  }
}
