import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages-module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PagesModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
    
  ],
  bootstrap: [App]
})
export class AppModule {}
