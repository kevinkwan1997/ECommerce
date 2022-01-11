import { TestBed } from '@angular/core/testing';

import { FullItemService } from './full-item.service';

describe('FullItemService', () => {
  let service: FullItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
