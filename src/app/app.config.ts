import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SystemComponent } from './shared/components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(), 
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient(), provideCharts(withDefaultRegisterables())

  ]
};
