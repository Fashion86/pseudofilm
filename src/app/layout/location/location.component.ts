import { Component, OnInit, EventEmitter } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Location } from '../../models/location';
import { RequestService } from '../../shared/services/request.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  animations: [routerTransition()],
  providers: [RequestService]
})
export class LocationComponent implements OnInit {

  locations: Location[] = [];
  editlocation: Location;
  showFormDialog: boolean;
  status_flag = 'Create';
  messages: Message[] = [];
  edittata = new EventEmitter<any>();
  constructor(private  api: RequestService,
              private spinnerService: Ng4LoadingSpinnerService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.getAllData();
    this.showFormDialog = false;
    this.editlocation = new Location();
  }

  getAllData() {
    this.api.getAllLocation().subscribe(res => {
      this.locations = res['data'];
      this.spinnerService.hide();
    });
  }

  startCreatePerson() {
    this.editlocation = new Location();
    this.status_flag = 'Create';
    this.showFormDialog = true;
    this.edittata.emit({editlocation: this.editlocation});
  }

  startEdit(location: Location) {
    this.editlocation = Object.assign({}, location);
    this.status_flag = 'Update';
    this.showFormDialog = true;
    this.edittata.emit({editlocation: this.editlocation});
  }

  onDeleteItem(location: Location) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // Actual logic to perform a confirmation
      }
    });
  }
  onCancelEdit() {
    this.showFormDialog = false;
  }

  onUpdate(location: Location) {
    this.showFormDialog = false;
    this.messages = [];
    if (!location.locationId) {
      this.api.addLocation(location).subscribe(res => {
        this.locations.push(res['data']);
        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Create Success'});
      }, err => {
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Create failed'});
      });
    } else {
      const edited = _.find(this.locations, p => p.locationId === location.locationId);
      Object.assign(edited, location);
      this.api.updateLocation(location, location.locationId).subscribe(res => {
        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'Update Success'});
      }, err => {
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Update failed'});
      });
    }

  }
}
