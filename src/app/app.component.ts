import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

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
    private apiService: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle(`Best Cat - ${environment.NAME}`)
    this.loadCats();
    this.loadVoteCount();
  }

  loadCats(): void {
    this.apiService.getCats(2).subscribe({
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
    this.apiService.getVoteCount().subscribe({
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
  
    this.apiService.submitVote(this.voteForm.value).subscribe({
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
