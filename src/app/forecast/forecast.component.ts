import { Component, OnInit } from '@angular/core';
import { weatherType } from 'src/types/weatherType';
import { ForecastService } from '../forecast.service';
import { LocalStorageService } from '../local-storage.service';

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
  starIconText = '☆';
  starIconClassList = 'star-icon';
  favouriteLocation = '';
  favouriteLocationContainerClassList = 'favourite-location-container';

  constructor(
    private forecastSerice: ForecastService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.favouriteLocation =
      this.localStorageService.getData('favourite-location');
    if (
      this.favouriteLocation === '' ||
      this.favouriteLocation === null ||
      this.favouriteLocation === undefined
    ) {
      this.favouriteLocationContainerClassList =
        'favourite-location-container invisible';
    }
  }

  handleChange(e: any) {
    this.searchValue = e.target.value;
  }

  openMainDiv() {
    this.mainDivClassList = '';
    this.favouriteLocationContainerClassList =
      'favourite-location-container invisible';
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

  hideKeyboardMobile(e: KeyboardEvent) {
    if (e.key == 'Enter' || e.key == 'Return') {
      document.getElementById('searchInput')?.blur();
    }
  }

  async handleSearch(e?: Event) {
    e?.preventDefault();
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
    this.checkFavouriteLocation();
  }
  setAsFavouriteLocation() {
    this.starIconText = '★';
    this.starIconClassList = 'star-icon active';
    if (
      this.currentWeatherData?.location.name &&
      this.currentWeatherData.location.country
    ) {
      this.localStorageService.saveData(
        'favourite-location',
        this.currentWeatherData?.location.name +
          ', ' +
          this.currentWeatherData.location.country
      );
      this.favouriteLocation =
        this.currentWeatherData?.location.name +
        ', ' +
        this.currentWeatherData.location.country;
    }
  }
  removeFavouriteLocation() {
    this.starIconText = '☆';
    this.starIconClassList = 'star-icon';
    this.favouriteLocationContainerClassList =
      'favourite-location-container invisible';
    this.localStorageService.removeData('favourite-location');
  }
  async openFavouriteLocation() {
    this.searchValue = this.favouriteLocation;
    this.handleSearch();
  }

  checkFavouriteLocation() {
    if (
      this.currentWeatherData?.location.name +
        ', ' +
        this.currentWeatherData?.location.country ===
      this.favouriteLocation
    ) {
      this.starIconText = '★';
      this.starIconClassList = 'star-icon active';
    }
  }
}
