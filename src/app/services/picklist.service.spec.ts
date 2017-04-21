/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PicklistService } from './picklist.service';

describe('PicklistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PicklistService]
    });
  });

  it('should ...', inject([PicklistService], (service: PicklistService) => {
    expect(service).toBeTruthy();
  }));
});
