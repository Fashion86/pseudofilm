import {Photo} from './photo';
export class Location {
  locationId: number;
  name: string;
  address: string;
  isApprovalNeeded: boolean;
  locationPhotos: Photo[] = [];
  images: any[] = [];
}
