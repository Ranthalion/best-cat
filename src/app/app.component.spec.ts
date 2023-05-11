import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApiService: any;
  let mockTitle: any;

  const mockCatsResponse = [
    { id: 1, url: 'cat1-url' },
    { id: 2, url: 'cat2-url' }
  ];

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getCats', 'getVoteCount', 'submitVote']);
    mockTitle = jasmine.createSpyObj('Title', ['setTitle']);

    mockApiService.getCats.and.returnValue(of(mockCatsResponse));
    mockApiService.getVoteCount.and.returnValue(of({ voteCount: 10 }));

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Title, useValue: mockTitle },
        { provide: ApiService, useValue: mockApiService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load cats on initialization', () => {
    mockApiService.getCats.and.returnValue(of(mockCatsResponse));

    component.ngOnInit();

    expect(mockApiService.getCats).toHaveBeenCalledWith(2);
    expect(component.cat1).toEqual(mockCatsResponse[0]);
    expect(component.cat2).toEqual(mockCatsResponse[1]);
    expect(component.loading).toBeFalse();
  });

  it('should load vote count on initialization', fakeAsync(() => {
    mockApiService.getVoteCount.and.returnValue(of({ voteCount: 10 }));

    component.ngOnInit();
    tick();

    expect(mockApiService.getVoteCount).toHaveBeenCalled();
    expect(component.voteCount).toEqual(10);
  }));

  it('should submit vote successfully', () => {
    mockApiService.submitVote.and.returnValue(of({}));

    component.voteForm.patchValue({ bestCat: 'abc123' });
    component.submitVote();
    fixture.detectChanges();

    
    expect(mockApiService.submitVote).toHaveBeenCalledWith({ bestCat: 'abc123' });
    expect(component.voteForm.value).toEqual({ bestCat: null });
  });

  it('should show error message when submitting form without selecting best cat', () => {
    component.submitVote();

    expect(component.submitted).toBeTrue();
    expect(component.voteForm.invalid).toBeTrue();
  });
});
