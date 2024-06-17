import { TestBed } from '@angular/core/testing';

import { EstudiandoService } from './estudiando.service';

describe('EstudiandoService', () => {
  let service: EstudiandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
