import { TestBed, inject } from '@angular/core/testing';

import { ImageprocessService } from './imageprocess.service';

describe('ImageprocessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageprocessService]
    });
  });

  it('should be created', inject([ImageprocessService], (service: ImageprocessService) => {
    expect(service).toBeTruthy();
  }));
});
