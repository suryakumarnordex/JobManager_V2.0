import { Injectable } from '@angular/core';

@Injectable()
export class PopupModelLocalvariable {
  public PriorityValue: string;

  public PriorityValueoption: string = '';
  public isSignpost: boolean = true;
  PrioriyArray: any = [
    { value: 'Lowest', label: 'Lowest' },

    { value: 'BelowNormal', label: 'BelowNormal' },

    { value: 'Normal', label: 'Normal' },

    { value: 'AboveNormal', label: 'AboveNormal' },

    { value: 'Highest', label: 'Highest' },
  ];

  //loding properties
  public isProgressbar: boolean = false;
  public isclose: boolean = false;
  public iscloseheader: boolean = false;
}
