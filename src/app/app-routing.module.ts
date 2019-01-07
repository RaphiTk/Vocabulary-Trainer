import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteSearchComponent } from './sites/search/search.component';
import { SiteMenuComponent } from './sites/menu/menu.component';
import { SiteQueryComponent } from './sites/query/query.component';
import { SiteChangeComponent } from './sites/change/change.component';
import { SiteSettingsComponent } from './sites/settings/settings.component';
import { CallbackComponent } from './frames/callback/callback.component';

const routes: Routes = [
  { path: '', component: SiteMenuComponent},
  { path: 'query/:clas/:unit', component: SiteQueryComponent},
  { path: 'query/:clas', component: SiteQueryComponent},
  { path: 'search', component: SiteSearchComponent},
  { path: 'change/:clas/:unit', component: SiteChangeComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'settings', component: SiteSettingsComponent },
  { path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
