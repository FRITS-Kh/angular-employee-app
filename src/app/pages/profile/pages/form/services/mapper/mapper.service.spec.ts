import { TestBed } from '@angular/core/testing';

import { MapperService } from './mapper.service';

describe('MapperService', () => {
  let service: MapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapperService],
    });
    service = TestBed.inject(MapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
