import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SafeUrl } from './pipes/safeurl.pipe';
import { MaterialBundleModule } from './material-bundle.module';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ConfigComponent, BottomSheetComponent } from './components/config/config.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { CoreModule } from './modules/core/core.module';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/shared/bar-chart/bar-chart.component';
import { RadarChartComponent } from './components/shared/radar-chart/radar-chart.component';
import { LineChartComponent } from './components/shared/line-chart/line-chart.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DatesComponent } from './components/dates/dates.component';
import { DetailDateComponent } from './components/dates/detail-date/detail-date.component';
import { StoreComponent } from './components/store/store.component';
import { SalesComponent } from './components/store/sales/sales.component';
import { DetailedItemComponent } from './components/warehouse/detailed-item/detailed-item.component';
import { DialogComponent } from './components/shared/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    SafeUrl,
    WarehouseComponent,
    ConfigComponent,
    BottomSheetComponent,
    LoginComponent,
    NoimagePipe,
    LoadingComponent,
    BarChartComponent,
    RadarChartComponent,
    LineChartComponent,
    DatesComponent,
    DetailDateComponent,
    StoreComponent,
    SalesComponent,
    DetailedItemComponent,
    DialogComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( ROUTES, { useHash: false }),
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialBundleModule,
    CoreModule,
    ChartsModule
  ],
  entryComponents: [BottomSheetComponent, DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
