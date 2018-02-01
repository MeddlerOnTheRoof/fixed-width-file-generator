import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { FileFormatterComponent } from './components/file-formatter/file-formatter.component';
import { FileInputComponent } from './components/file-input/file-input.component';

import { FieldDetailComponent } from './components/field-detail/field-detail.component';

import { FileFormatService } from './services/file-format.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'file-formatter', component: FileFormatterComponent },
  { path: 'file-input', component: FileInputComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileFormatterComponent,
    FileInputComponent,
    FieldDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [FileFormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
