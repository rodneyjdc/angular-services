import { Injectable } from '@angular/core';

@Injectable()
export class BadgeService {

  // ONLY USED IN edit-reader.component
  constructor() { }

  getReaderBadge(minutesRead: number): string {
    if (minutesRead > 5000) {
      return 'Book Worm';
    }
    else if (minutesRead > 2500) {
      return 'Page Turner';
    } 
    else {
      return 'Getting Started';
    }
  }

}
