import { TestBed, inject } from '@angular/core/testing';

import { RundenService } from './runden.service';

describe('RundenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RundenService]
    });
  });

  it('should be created', inject([RundenService], (service: RundenService) => {
    expect(service).toBeTruthy();
  }));
});
