import { Component, Input } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';

@Component({
  moduleId: 'checkbox-list-filter',
  selector: 'checkbox-list-filter',
  template: `
    <div>
      <ul
        style="list-style:none;overflow-y:scroll; height:150px; width: auto;overflow:auto ;"
      >
        <li *ngFor="let item of items">
          <div class="clr-control-container clr-control-inline">
            <input
              type="checkbox"
              clrCheckbox
              (change)="onItemChanged(item, $event)"
              [checked]="item.checked"
              [disabled]="item.disabled"
            />
            <span>{{ item.value }}</span>
          </div>
        </li>
      </ul>
    </div>
  `,
})
export class CheckboxListFilterComponent
  implements ClrDatagridFilterInterface<{ key: string; value: string }>
{
  public static instanceof(obj: any) {
    return (
      obj.hasOwnProperty('filterParamName') &&
      obj.hasOwnProperty('items') &&
      obj.hasOwnProperty('selectedItems')
    );
  }

  // Used as the key for the param string
  @Input() public filterParamName: any;

  @Input() public items: any;

  public selectedItems: Array<{
    checked: boolean;
    key: string;
    value: string;
  }> = [];

  constructor() {}

  public changes = new Subject<any>();

  public get state() {
    return this;
  }

  // This will look into the list of items and attempt to match it
  @Input('defaultFilterValues')
  public set defaultFilterValues(newValues: string[]) {
    if (newValues) {
      this.selectedItems = [];
      if (this.items && Array.isArray(this.items)) {
        for (let item of this.items) {
          if (newValues && Array.isArray(newValues)) {
            for (let newValue of newValues) {
              if (item.key === newValue) {
                item.checked = true;
                this.selectedItems.push(item);
              }
            }
          }
        }
      }
    }
    this.changes.next(true);
  }

  public onItemChanged(item: any, event: any) {
    if (!item.checked) {
      item.checked = true;
      this.selectedItems.push(item);
    } else {
      item.checked = false;

      let index = this.selectedItems.indexOf(item);

      if (index >= 0) {
        this.selectedItems.splice(index, 1);
      }
    }
    this.changes.next(true);
  }

  public accepts(item: { [x: string]: any }): boolean {
    for (let currentItem of this.items) {
      if (
        currentItem.checked &&
        currentItem.key === item[this.filterParamName]
      ) {
        return true;
      }
    }
    return false;
  }

  public isActive(): boolean {
    return this.selectedItems != null && this.selectedItems.length > 0;
  }
}
