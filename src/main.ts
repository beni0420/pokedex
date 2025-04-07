import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/resources/views/app.config';
import { AppComponent } from './app/resources/views/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
