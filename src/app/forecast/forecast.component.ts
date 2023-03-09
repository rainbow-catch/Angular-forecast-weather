import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(e: any) {
    this.searchValue = e.target.value;
  }

  handleSearch(e:Event) {
    e.preventDefault();
    console.log(this.searchValue);
    
  }

}
