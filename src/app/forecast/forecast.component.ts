import { Component, OnInit } from '@angular/core';
import { weatherType } from 'src/types/weatherType';
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
  currentWeatherData: weatherType | undefined = undefined;
  threeDaysForecastData: weatherType | undefined = undefined;
  forecastIcon: string = '';
  forecastIcons: string[] = ['', '', ''];

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
    return this.currentWeatherData?.location.localtime.substring(
      0,
      this.currentWeatherData.location.localtime.length - 5
    );
  }

  closeMainDivEvent(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.currentWeatherData = undefined;
      this.closeMainDiv();
      this.threeDaysForecastData = undefined;
    }
  }

  showErrorText() {
    this.errorContainerClassList = '';
    setTimeout(() => {
      this.errorContainerClassList = 'invisible';
    }, 2500);
  }

  hideKeyboardMobile(e:KeyboardEvent) {
    if (e.key == 'Enter' || e.key == 'Return') {
      document.getElementById('searchInput')?.blur();
    }
  }

  async handleSearch(e: Event) {
    e.preventDefault();
    let currentResponse;
    let threeDaysForecastResponse;
    if (this.searchValue !== null && this.searchValue !== '') {
      currentResponse = await this.forecastSerice.getCurrentWeather(
        this.searchValue
      );
      threeDaysForecastResponse =
        await this.forecastSerice.getForecastThreeDays(this.searchValue);
      if (currentResponse === 'error') {
        this.showErrorText();
        return;
      }
      this.currentWeatherData = currentResponse;
      this.threeDaysForecastData = threeDaysForecastResponse;
      console.log(this.threeDaysForecastData);
      this.forecastIcons.forEach((icon, index) => {
        if (
          this.threeDaysForecastData?.forecast?.forecastday[index].day
            .condition !== undefined
        ) {
          this.forecastIcons[index] = this.forecastSerice.returnWeatherIcon(
            this.threeDaysForecastData?.forecast?.forecastday[index].day
              .condition
          );
        }
      });
      if (this.currentWeatherData) {
        this.forecastIcon = this.forecastSerice.returnWeatherIcon(
          this.currentWeatherData?.current.condition
        );
      }
      console.log(this.currentWeatherData);
      console.log(this.forecastIcons);

      this.openMainDiv();
    }
  }
}
