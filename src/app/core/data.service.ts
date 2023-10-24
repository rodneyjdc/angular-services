import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { allBooks, allReaders } from 'app/data';
import { BookTrackerError } from 'app/models/book-tracker-error';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService,
      private http: HttpClient) { }

  getAuthorRecommendation(readerId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerId > 0) {
          resolve('Dr. Seuss');
        } else {
          reject('Invalid reader ID.')
        }
      }, 2000);
    });
  }
  
  setMostPopularBook(book: Book): void {
    this.mostPopularBook = book;
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    this.loggerService.log('Getting all books.');
    // return allBooks;

    return this.http.get<Book[]>('api/books')
      .pipe(
        catchError(this.handleHttpError)
      )
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred while retrieving data.'

    return throwError(dataError);
  }

  getBookById(bookId: number): Book {
    this.loggerService.log(`Getting book with ID ${bookId}.`);
    return allBooks.find(book => book.bookID === bookId);
  }

  getAllReaders(): Reader[] {
    this.loggerService.log('Getting all readers.');
    return allReaders;
  }

  getReaderById(readerId: number): Reader {
    this.loggerService.log(`Getting reader with ID ${readerId}`);
    return allReaders.find(reader => reader.readerID === readerId);
  }
}
