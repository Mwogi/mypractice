import { TestBed } from '@angular/core/testing';

import { TokentInterceptorService } from './tokent-interceptor.service';

describe('TokentInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokentInterceptorService = TestBed.get(TokentInterceptorService);
    expect(service).toBeTruthy();
  });
});
