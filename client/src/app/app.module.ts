import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { UserService } from './shared/services/user.service'
import { AuthService } from './shared/services/auth.service'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import { UserComponent } from './users/users.component'
import { LoginComponent } from './login/login.component';
import { CurrentUserComponent } from './currentuser/currentuser.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    CurrentUserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
