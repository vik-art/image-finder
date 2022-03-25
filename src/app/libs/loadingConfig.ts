import { NgxLoadingXConfig, POSITION, SPINNER } from "ngx-loading-x";


export const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgColor: 'rgba(40, 40, 40, 0.5)',
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 150,
  spinnerColor: 'rgba(32, 236, 5, 0.8)',
  spinnerPosition: POSITION.centerCenter,
}