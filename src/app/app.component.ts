import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cat1: any;
  cat2: any;
  voteCount: number = 0;

  loading: boolean = true;
  submitted: boolean = false;

  voteForm = this.formBuilder.group({
    bestCat: ['', Validators.required]
  })

  constructor(
    private title: Title,
    private http: HttpClient, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle(`Best Cat - ${environment.NAME}`)
    this.loadCats();
    this.loadVoteCount();
  }

  loadCats(): void {
    this.http.get<any>('https://api.thecatapi.com/v1/images/search?limit=2').subscribe({
      next: (response) => {
        this.cat1 = response[0];
        this.cat2 = response[1];
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load cats:', error);
      }
    });
  }

  loadVoteCount(): void {
    this.http.get<any>('/user/vote-count').subscribe({
      next: (response) => {
        this.voteCount = response.voteCount;
      },
      error: (error) => {
        console.error('Failed to load vote count:', error);
      }
    });
  }

  submitVote(): void {
    if (this.voteForm.invalid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
  
    this.http.post<any>('/user/vote-count', this.voteForm.value).subscribe({
      next: (response) => {
        this.voteForm.reset();
        this.loadCats();
      },
      error: (error) => {
        console.error('Failed to load cats:', error);
      }
    });
  }

}
