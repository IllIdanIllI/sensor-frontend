import { MatButtonModule } from '@angular/material/button';
import { DemoMaterialModule } from './material-module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';;
import { SensorTableComponent } from './sensor-table/sensor-table.component'
;
import { SensorModifyComponent } from './sensor-modify/sensor-modify.component'

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        
    ],
    entryComponents:[
        SensorModifyComponent,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SensorTableComponent,
        SensorModifyComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }