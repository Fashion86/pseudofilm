import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../../models/person';
import { Photo } from '../../../models/photo';
import { Role } from '../../../models/role';
import { ImageprocessService } from '../../../shared/services/imageprocess.service';
import { RequestService } from '../../../shared/services/request.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  providers: [RequestService, ImageprocessService]
})
export class PersonFormComponent implements OnInit {

  roles1 = [
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
  @Input() edittata: EventEmitter<any>;
  @Output() update = new EventEmitter<Person>();
  @Output() cancel = new EventEmitter();
  editperson: Person;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageType: any = '';
  roles: Role[] = [];
  dropdownSettings = {};
  constructor(private  api: RequestService,
              private  imgservice: ImageprocessService) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'roleId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
  }

  ngOnInit() {
    this.editperson = new Person();
    this.api.getRoles().subscribe(res => {
      this.roles = res['data'];
    }, err => {
      console.log('err', err);
    });
    if (this.edittata) {
      this.edittata.subscribe(data => {
        this.editperson = Object.assign({}, data.editperson);
        this.croppedImage = null;
        this.imageChangedEvent = '';
        if (this.editperson.personPhoto) {
          this.editperson.imageurl = this.imgservice.strTobase64(this.editperson.personPhoto);
        }
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
      const data = this.croppedImage.split(',')[1];
      const photo = new Photo();
      photo.contentType = this.imageType;
      photo.content = data;
      this.editperson.personPhoto = photo;
    }
  }
  onSubmit() {
    this.saveCropImg();
    this.update.emit(this.editperson);
  }
  onCancel() {
    this.cancel.emit();
  }

}
