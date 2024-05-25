import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/configurations/app.config';
import { AppComponent } from './app/configurations/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
