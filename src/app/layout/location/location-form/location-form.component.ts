import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '../../../models/location';
import { Photo } from '../../../models/photo';
import { ImageprocessService } from '../../../shared/services/imageprocess.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  providers: [ImageprocessService]
})
export class LocationFormComponent implements OnInit {
  @Input() edittata: EventEmitter<any>;
  @Output() update = new EventEmitter<Location>();
  @Output() cancel = new EventEmitter();
  editlocation: Location;
  constructor(private  imgservice: ImageprocessService) { }

  ngOnInit() {
    this.editlocation = new Location();
    if (this.edittata) {
      this.edittata.subscribe(data => {
        this.editlocation = Object.assign({}, data.editlocation);
        if (this.editlocation.locationPhotos.length > 0) {
          this.editlocation.imageurl = this.imgservice.strTobase64(this.editlocation.locationPhotos[this.editlocation.locationPhotos.length - 1]);
        }
      });
    }
  }

  onSubmit() {
    this.update.emit(this.editlocation);
  }

  async selectPhoto(event): Promise<void> {
    this.editlocation.locationPhotos = [];
    this.editlocation.imageurl = await this.imgservice.getBase64(event.target.files.item(0));
    const data = (this.editlocation.imageurl).split(',')[1];
    const binaryBlob = atob(data);
    const photo = new Photo();
    photo.contentType = event.target.files.item(0).type;
    photo.content = data;
    this.editlocation.locationPhotos.push(photo);
  }

  onCancel() {
    this.cancel.emit();
  }
}
