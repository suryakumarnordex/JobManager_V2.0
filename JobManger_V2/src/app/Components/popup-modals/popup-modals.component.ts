import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-modals',
  templateUrl: './popup-modals.component.html',
  styleUrls: ['./popup-modals.component.css'],
})
export class PopupModalsComponent implements OnInit {
  isOpen: boolean = false;
  get parentChildConnection(): boolean {
    return this.isOpen;
  }
  @Input() set parentChildConnection(setting: boolean) {
    this.isOpen = setting;
    if (setting === false) {
      this.modalClosed.emit();
    }
  }
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {}
  discord() {
    alert('Ok');
  }
}
