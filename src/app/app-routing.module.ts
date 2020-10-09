import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotographyComponent} from './photography/photography.component'
import {EventComponent} from './event/event.component';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {ChatComponent} from './chat/chat.component';
const routes: Routes = [
  {
    path: 'photography',
    component: PhotographyComponent
  },
  {
    path: 'event',
    component: EventComponent
  },
 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'login',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
