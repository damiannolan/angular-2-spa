import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { appRoutes } from './app.routes';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { PicklistService } from './services/picklist.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostEditorComponent } from './post-editor/post-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    PostEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    PicklistService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
