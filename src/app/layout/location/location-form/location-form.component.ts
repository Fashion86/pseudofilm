import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../models/location';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  providers: [RequestService]
})
export class LocationFormComponent implements OnInit {
  @Input() edittata: EventEmitter<any>;
  @Output() update = new EventEmitter<Location>();
  @Output() cancel = new EventEmitter();
  editlocation: Location;
  constructor(private  api: RequestService) { }

  ngOnInit() {
    this.editlocation = new Location();
    if (this.edittata) {
      this.edittata.subscribe(data => {
        this.editlocation = Object.assign({}, data.editlocation);
      });
    }
  }
  onSubmit() {
    console.log(this.editlocation)
    this.update.emit(this.editlocation);
  }

  onCancel() {
    this.cancel.emit();
  }
}
