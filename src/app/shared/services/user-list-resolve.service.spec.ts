import { TestBed } from '@angular/core/testing';

import { UserListResolve } from './user-list-resolve.service';

describe('UserListResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserListResolve = TestBed.get(UserListResolve);
    expect(service).toBeTruthy();
  });
});
