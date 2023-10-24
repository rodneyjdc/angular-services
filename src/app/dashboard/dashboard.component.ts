import { Component, OnInit } from '@angular/core';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/core/logger.service';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/book-tracker-error';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
    private dataService: DataService) { }

  ngOnInit() {
    this.loggerService.log('Initializing Dashboard component.');
    // this.allBooks = this.dataService.getAllBooks();

    // using an Observable
    this.dataService.getAllBooks()
      .subscribe(
        (data: Book[] | BookTrackerError) => this.allBooks = <Book[]>data,
        (err: BookTrackerError) => this.loggerService.log(err.friendlyMessage),
        () => console.log('Done getting all books!')
      );

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    // using a Promise
    // this.dataService.getAuthorRecommendation(1)
    //   .then(
    //     resolvedData =>  this.loggerService.log(`Recommended author: ${resolvedData}`),
    //     rejectedData => this.loggerService.error(`The promise was rejected: ${rejectedData}`)
    //   )
    //   .catch(
    //     (err: Error) => this.loggerService.error(err.message)
    //   )

    // using async/await keywords
    this.getAuthorRecommendationAsync1(1);
    this.getAuthorRecommendationAsync2(-1)
      .catch(error => this.loggerService.error(`Error during async 2: ${error}`));


    this.loggerService.log('Done initializing Dashboard Component.')
  }

  // handling errors with try/catch block
  private async getAuthorRecommendationAsync1(readerId: number): Promise<void> {
    try {
      let author: string = await this.dataService.getAuthorRecommendation(readerId);
      this.loggerService.log(`Recommended author async 1: ${author}`);
    } 
    catch (error) {
      this.loggerService.error(`Error during async 1: ${error}`);
    }
  }

  // handling errors with catch() when the method is called
  private async getAuthorRecommendationAsync2(readerId: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(readerId);
    this.loggerService.log(`Recommended author async 2: ${author}`);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
