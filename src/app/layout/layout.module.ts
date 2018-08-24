import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {GrowlModule} from 'primeng/growl';
import {CardModule} from 'primeng/card';
import {GalleriaModule} from 'primeng/galleria';
import {MultiSelectModule} from 'primeng/multiselect';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { PageHeaderModule } from './../shared';
import { CharacterComponent } from './character/character.component';
import { CharacterFormComponent } from './character/character-form/character-form.component';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { LocationComponent } from './location/location.component';
import { LocationFormComponent } from './location/location-form/location-form.component';
@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        PageHeaderModule,
        NgbDropdownModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        RadioButtonModule,
        ConfirmDialogModule,
        GrowlModule,
        CardModule,
        GalleriaModule,
        ImageCropperModule,
        MultiSelectModule
    ],
    declarations: [
      LayoutComponent,
      SidebarComponent,
      HeaderComponent,
      CharacterComponent,
      CharacterFormComponent,
      PersonComponent,
      PersonFormComponent,
      LocationComponent,
      LocationFormComponent
    ],
  providers: [
    ConfirmationService
    ]
})
export class LayoutModule {}
