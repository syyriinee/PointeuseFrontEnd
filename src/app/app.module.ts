import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar,
  DateInput,
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  TimePicker,
  DateinputsInstaller } from '@progress/kendo-dateinputs-vue-wrapper';
// import * as Vue from 'vue/types/umd';
//   Vue.use(DateinputsInstaller)

//   new Vue({
//       el: '#app',
//       components: {
//           Calendar,
//           DateInput,
//           DatePicker,
//           DateRangePicker,
//           DateTimePicker,
//           TimePicker
//       }
//   })
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    IntlModule,
    LabelModule,
    DateInputsModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export default {
  components: {
    'kendo-calendar': Calendar
  }
}