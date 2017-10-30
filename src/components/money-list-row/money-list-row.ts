import { Component } from '@angular/core';

/**
 * Generated class for the MoneyListRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'money-list-row',
  templateUrl: 'money-list-row.html'
})
export class MoneyListRow {

  text: string;

  constructor() {
    console.log('Hello MoneyListRowComponent Component');
    this.text = 'Hello World';
  }

}
