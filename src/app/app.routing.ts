import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ConfigComponent } from './components/config/config.component';
import { LoginComponent } from './components/login/login.component';
import { DatesComponent } from './components/dates/dates.component';
import { DetailDateComponent } from './components/dates/detail-date/detail-date.component';
import { StoreComponent } from './components/store/store.component';
import { SalesComponent } from './components/store/sales/sales.component';
import { DetailedItemComponent } from './components/warehouse/detailed-item/detailed-item.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'warehouse', component: WarehouseComponent },
    { path: 'warehouse/item', component: DetailedItemComponent },
    { path: 'config', component: ConfigComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dates', component: DatesComponent },
    { path: 'dates/new', component: DetailDateComponent },
    { path: 'store', component: StoreComponent },
    { path: 'store/sell', component: SalesComponent },
    // Redirect default
    { path: '', component: HomeComponent },
    // 404 not found
    { path: '**', component: NotfoundComponent }
];

