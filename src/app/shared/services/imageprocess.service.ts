import { Injectable } from '@angular/core';
import { Photo } from '../../models/photo';

@Injectable({
  providedIn: 'root'
})
export class ImageprocessService {

  constructor() { }
  async getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  strTobase64(pto: Photo): string {
    let imgstr: string;
    imgstr = 'data:' + pto.contentType + ';base64,' + pto.content;
    return imgstr;
  }
}

