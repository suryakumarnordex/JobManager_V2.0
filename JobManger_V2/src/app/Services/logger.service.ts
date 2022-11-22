import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  @Output() warning: EventEmitter<string> = new EventEmitter<string>();
  @Output() error: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  log(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`INFO [${timestamp}] ${message}`);
  }

  reportWarning(message: string) {
    const timestamp = new Date().toISOString();
    this.warning.emit(message);
    console.warn(`WARN [${timestamp}] ${message}`);
  }

  reportError(message: string) {
    const timestamp = new Date().toISOString();
    this.error.emit(message);
    console.error(`ERROR [${timestamp}] ${message}`);
  }
}
