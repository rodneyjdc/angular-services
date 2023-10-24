import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {
    log(message: string): void {
        const stringTime: string = new Date().toLocaleTimeString();
        console.log(`${message} (${stringTime})`);
    }

    error(message: string): void {
        console.log(`ERROR: ${message}`);
    }
}