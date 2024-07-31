import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SystemComponent } from './shared/components/system/system.component';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), 
    provideAnimations(),
    MessageService,
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(), 
    provideCharts(withDefaultRegisterables())

  ]
};
