import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { SiteMenuComponent } from './site-menu/site-menu.component';
import { SiteQueryComponent } from './site-query/site-query.component';
import { SiteSearchComponent } from './site-search/site-search.component';
import { SiteChangeComponent } from './site-change/site-change.component';

const routes: Routes = [
  { path: 'menu', component: SiteMenuComponent},
  { path: 'query', component: SiteQueryComponent},
  { path: 'search', component: SiteSearchComponent},
  { path: 'change', component: SiteChangeComponent},
  { path: 'settings', component: SiteSettingsComponent },
  
  { path: '', redirectTo: '/menu', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
