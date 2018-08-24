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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageType: any = '';
  constructor(private  imgservice: ImageprocessService) {

  }

  ngOnInit() {
    this.editlocation = new Location();
    if (this.edittata) {
      this.edittata.subscribe(data => {
        this.croppedImage = null;
        this.imageChangedEvent = '';
        this.editlocation = Object.assign({}, data.editlocation);
      });
    }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageType = event.target.files[0].type;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  saveCropImg() {
    if (this.croppedImage) {
      this.editlocation.locationPhotos = [];
      const data = this.croppedImage.split(',')[1];
      const binaryBlob = atob(data);
      const photo = new Photo();
      photo.contentType = this.imageType;
      photo.content = data;
      this.editlocation.locationPhotos.push(photo);
    }
  }
  onSubmit() {
    this.saveCropImg();
    this.update.emit(this.editlocation);
  }

  async selectPhoto(event): Promise<void> {
    this.editlocation.locationPhotos = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const base64 = await this.imgservice.getBase64(event.target.files[i]);
      const data = (base64).split(',')[1];
      const binaryBlob = atob(data);
      const photo = new Photo();
      photo.contentType = event.target.files[i].type;
      photo.content = data;
      this.editlocation.locationPhotos.push(photo);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
