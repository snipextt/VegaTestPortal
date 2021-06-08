import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsRoutingModule } from './assignments-routing.module';
import { TestsComponent } from './tests/tests.component';
import { UpdateTestContentComponent } from './update-test-content/update-test-content.component';
import { AssessmentEditorComponent } from './popups/assessment-editor/assessment-editor.component';
import { SectionComponent } from './popups/section/section.component';
import { VegaMaterialModule } from 'src/app/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from './popups/calculator/calculator.component';
import { CountdownModule } from 'ngx-countdown';
import { TestconfigComponent } from './popups/test-config/test-config.component';
import { QuestionslistComponent } from './popups/questions-list/questions-list.component';
import { TestLiveComponent } from './popups/test-live/test-live.component';
import { ShowResultComponent } from './show-result/show-result.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    TestsComponent,
    UpdateTestContentComponent,
    AssessmentEditorComponent,
    SectionComponent,
    CalculatorComponent,
    TestconfigComponent,
    QuestionslistComponent,
    TestLiveComponent,
    ShowResultComponent
  ],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    VegaMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CountdownModule,
    AngularEditorModule,
    NgScrollbarModule

  ],
  entryComponents : [
    AssessmentEditorComponent,
    SectionComponent,
    CalculatorComponent,
    TestconfigComponent,
    QuestionslistComponent,
    TestLiveComponent
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AssignmentsModule { }
