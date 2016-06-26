import { bootstrap } from 'angular2/platform/browser';
import { LoginService } from './account/login.service';

// Our main component
import { AppComponent } from './app.component';

bootstrap(AppComponent, [LoginService]);