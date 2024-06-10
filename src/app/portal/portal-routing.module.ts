import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { UserComponent } from './component/user/user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { QuizzComponent } from './component/quizz/quizz.component';

import { CoursComponent } from './component/cours/cours.component';
import { ContenuCoursComponent } from './component/contenu-cours/contenu-cours.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'quizz',
        component: QuizzComponent,
      },
      {
        path: 'cours',
        component: CoursComponent,
      },
      {
        path: 'cours/:_id',
        component: ContenuCoursComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
