import { Injectable } from '@angular/core';
@Injectable()
export class PopupModelLocalvariable{
  public PriorityValue: string;
  public PriorityValueoption: string='';
  PrioriyArray:any = [  
    { value: 'Lowest', label: 'Lowest' }, 
     { value: 'BelowNormal', label: 'BelowNormal' }, 
      { value: 'Normal', label: 'Normal' }, 
       { value: 'AboveNormal', label: 'AboveNormal' }, 
        { value: 'Highest', label: 'Highest' }
      ];
}