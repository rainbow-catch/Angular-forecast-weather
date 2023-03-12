import { Component, OnInit } from '@angular/core';
import { forecastType } from 'src/types/forecastType';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  searchValue: string = '';
  mainDivClassList = 'closed';
  errorContainerClassList = 'invisible';
  forecastData: forecastType | undefined = undefined;
  forecastIcon: string | undefined;

  constructor(private forecastSerice: ForecastService) {}

  ngOnInit(): void {}

  handleChange(e: any) {
    this.searchValue = e.target.value;
  }

  openMainDiv() {
    this.mainDivClassList = '';
  }
  closeMainDiv() {
    this.mainDivClassList = 'closed';
  }

  formatDate() {
    return this.forecastData?.location.localtime.substring(
      0,
      this.forecastData.location.localtime.length - 5
    );
  }

  closeMainDivEvent(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.forecastData = undefined;
      this.closeMainDiv();
    }
  }

  showErrorText() {
    this.errorContainerClassList = '';
    setTimeout(() => {
      this.errorContainerClassList = 'invisible';
    }, 2500);
  }

  async handleSearch(e: Event) {
    e.preventDefault();
    let response;
    if (this.searchValue !== null && this.searchValue !== '') {
      response = await this.forecastSerice.getForecast(this.searchValue);
      if (response === 'error') {
        this.showErrorText();
        return;
      }
      this.forecastData = response;
      let condition = this.forecastData?.current.condition;
      let isDay = this.forecastData?.current.is_day;
      if (condition !== undefined && isDay !== undefined) {
        this.forecastIcon = 'assets/weather-icons/';
        this.forecastIcon += this.forecastSerice.returnWeatherIcon(
          condition,
          isDay
        );
        this.forecastIcon += '.png';
      }
      console.log(this.forecastData);
      console.log(this.forecastIcon);

      this.openMainDiv();
    }
  }
}
