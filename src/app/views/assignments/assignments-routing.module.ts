import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowResultComponent } from './show-result/show-result.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';
import { TestsComponent } from './tests/tests.component';
import { UpdateTestContentComponent } from './update-test-content/update-test-content.component';

const routes: Routes = [
  {
    path: '',
    component: TestsComponent,
  },
  {
    path: 'update-test/:id',
    component: UpdateTestContentComponent,
  },
  {
    path: 'test-preview',
    component: TestPreviewComponent,
  },
  {
    path: 'test-preview/:id',
    component: TestPreviewComponent,
  },
  {
    path: 'show-result/:id',
    component: ShowResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
