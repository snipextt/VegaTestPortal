import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PAGE_OPTIONS } from 'src/app/core/constants';
import { AppState } from 'src/app/state_management/_states/auth.state';
import { TestConfigService } from '../../assignments/services/test-config-service';
import { BreadcrumbNavService } from '../../layout/breadcrumb/breadcrumb-nav.service';
import {
  Metric,
  StudentReportModel,
} from 'src/app/models/reports/student-report-model';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss'],
})
export class StudentReportComponent implements OnInit {
  filterList = [
    'Section Level',
    // 'Topic Level',
    // 'Difficulty Level',
    'Solution',
    'Ranking',
  ];

  rankingDisplayedColumn: string[] = ['name', 'totalMarks', 'marksReceived'];

  solutionFilter = ['Correct', 'Incorrect', 'Skipped'];
  displayedColumns: string[] = [
    'name',
    'questions',
    'timeTaken',
    'attempt',
    'correct',
    'incorrect',
    'skipped',
    'score',
    'accuracy',
  ];
  userName: string = '';
  studentName: string = '';
  userType: string = '';
  assignmentId: string = '';

  fetchedWholeAssignmentResult;

  rankingDetailsResult;

  metrics;

  currentSelection = 'Section Level';

  solution = 'Solution';

  quickView = 'Charts';

  currentSolutionSelection = '';

  public pageOptions = PAGE_OPTIONS;

  isLoading: boolean = true;

  dataSource = new MatTableDataSource<StudentReportModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  assignmentChartData: {
    type: string;
    title: string;
    config?: any;
    data: { name: string; value?: number; series?: any[] }[];
  }[] = [];

  constructor(
    public translate: TranslateService,
    private store: Store<AppState>,
    private testConfigService: TestConfigService,
    private activatedRoute: ActivatedRoute,
    public _sanitizer: DomSanitizer,
    public breadcrumbNavService: BreadcrumbNavService
  ) {}

  ngOnInit() {
    this.store.select('appState').subscribe((data) => {
      this.userName = data?.user?.userName;
      this.studentName = data?.user?.firstName + ' ' + data?.user?.lastName;
      this.userType = data?.user?.authorities[0]?.authority;
      console.log('data', data);
    });
    this.isLoading = true;
    this.getAssignmentResults();
    this.getRankingDetails();
  }

  getAssignmentResults() {
    this.activatedRoute.params.subscribe((params) => {
      let assignmentId = params.id;
      console.log('assignmentId=>', assignmentId); // Print the parameter to the console.
      this.testConfigService
        .getStudentAssignmentResult(assignmentId, this.userName)
        .subscribe(
          (res) => {
            this.fetchedWholeAssignmentResult = res;
            this.breadcrumbNavService.pushOnClickCrumb({ label: res.testName });
            this.createAssignmentChartData(res.summary.metric);
            this.isLoading = false;
            this.metrics = res.summary.metric;
            this.showFilteredData(this.currentSelection);
          },
          (err) => {
            console.log('Error while fetching studentReport=>', err);
            this.isLoading = false;
          }
        );
    });
  }

  getRankingDetails() {
    this.activatedRoute.params.subscribe((params) => {
      this.testConfigService.getRankingDetails(params.id).subscribe((resp) => {
        this.rankingDetailsResult = resp;
      });
    });
  }

  changeSolutionFilter(filterMode?) {
    if (this.currentSolutionSelection === filterMode) {
      this.currentSolutionSelection = '';
    } else {
      this.currentSolutionSelection = filterMode;
    }
  }

  showFilteredData(filterMode?) {
    this.currentSelection = filterMode;
    var datas = [];
    var totScore = 0,
      negativeMarks = 0,
      totalTimeInSecs = 0,
      totalQuestions = 0,
      totalCorrectQuestions = 0,
      totalAttemptedQuestions = 0,
      totalAccuracyPerc = 0,
      noOfRows = 0;

    if (filterMode === 'Section Level') {
      this.fetchedWholeAssignmentResult.summary.sections.map((sec) => {
        var studentReportModel = new StudentReportModel();
        studentReportModel.name = sec.sectionName;
        studentReportModel.questions = sec.metric.totalQuestions;
        studentReportModel.timeTaken = sec.metric.totalTimeInSec;
        studentReportModel.attempt = sec.metric.attempted;
        studentReportModel.incorrect = sec.metric.incorrect;
        studentReportModel.skipped = sec.metric.skipped;
        studentReportModel.score = sec.metric.marksReceived;

        totScore += sec.metric.marksReceived;
        negativeMarks += sec.metric.negativeMarks;

        totalTimeInSecs += sec.metric.marksReceived;
        totalQuestions += sec.metric.totalQuestions;
        totalCorrectQuestions += sec.metric.correct;
        totalAttemptedQuestions += sec.metric.attempted;

        studentReportModel.correct = sec.metric.correct;
        studentReportModel.accuracy =
          Math.round(
            (sec.metric.correct / sec.metric.totalQuestions) * 100 * 100
          ) / 100;
        totalAccuracyPerc += studentReportModel.accuracy;
        if (studentReportModel.accuracy > 0) noOfRows++;
        datas.push(studentReportModel);
      });
      this.dataSource.data = datas;
    } else if (filterMode === 'Topic Level') {
      this.fetchedWholeAssignmentResult.summary.topics.map((sec) => {
        var studentReportModel = new StudentReportModel();
        studentReportModel.name = sec.topic;
        studentReportModel.questions = sec.metric.totalQuestions;
        studentReportModel.timeTaken = sec.metric.totalTimeInSec;
        studentReportModel.attempt = sec.metric.attempted;
        studentReportModel.incorrect = sec.metric.incorrect;
        studentReportModel.skipped = sec.metric.skipped;
        studentReportModel.score = sec.metric.marksReceived;
        studentReportModel.accuracy =
          Math.round(
            (sec.metric.correct / sec.metric.totalQuestions) * 100 * 100
          ) / 100;
        studentReportModel.correct = sec.metric.correct;

        totScore += sec.metric.marksReceived;
        negativeMarks += sec.metric.negativeMarks;
        totalTimeInSecs += sec.metric.marksReceived;
        totalQuestions += sec.metric.totalQuestions;
        totalCorrectQuestions += sec.metric.correct;
        totalAttemptedQuestions += sec.metric.attempted;
        totalAccuracyPerc += studentReportModel.accuracy;
        if (sec.metric.attempted > 0) noOfRows++;

        datas.push(studentReportModel);
      });
      this.dataSource.data = datas;
    } else if (filterMode === 'Difficulty Level') {
      this.fetchedWholeAssignmentResult.summary.difficulty.map((sec) => {
        var studentReportModel = new StudentReportModel();
        studentReportModel.name = sec.difficultyLevel;
        studentReportModel.questions = sec.metric.totalQuestions;
        studentReportModel.timeTaken = sec.metric.totalTimeInSec;
        studentReportModel.attempt = sec.metric.attempted;
        studentReportModel.incorrect = sec.metric.incorrect;
        studentReportModel.skipped = sec.metric.skipped;
        studentReportModel.score = sec.metric.marksReceived;
        studentReportModel.accuracy =
          Math.round(
            (sec.metric.correct / sec.metric.totalQuestions) * 100 * 100
          ) / 100;
        studentReportModel.correct = sec.metric.correct;

        totScore += sec.metric.marksReceived;
        negativeMarks += sec.metric.negativeMarks;
        totalTimeInSecs += sec.metric.marksReceived;
        totalQuestions += sec.metric.totalQuestions;
        totalCorrectQuestions += sec.metric.correct;
        totalAttemptedQuestions += sec.metric.attempted;
        totalAccuracyPerc += studentReportModel.accuracy;
        if (studentReportModel.accuracy > 0) noOfRows++;

        datas.push(studentReportModel);
      });
      this.dataSource.data = datas;
    } else if (filterMode === 'Ranking') {
      this.dataSource.data = this.rankingDetailsResult;
    }
  }

  onTabChanged($event) {
    if ($event.tab.textLabel === 'Ranking') {
      this.dataSource.data = this.rankingDetailsResult;
    }
    if ($event.tab.textLabel === 'QuickView') {
    }
    if ($event.tab.textLabel === 'Questions') {
    }
  }

  public transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

  getTotal(property: string) {
    return this.dataSource.data
      .map((t) => t[property])
      .reduce((acc, value) => acc + value, 0);
  }

  createAssignmentChartData(metrics: Metric) {
    this.assignmentChartData.push({
      type: 'Pie',
      title: 'Questions Statistics',
      config: {
        colorScheme: ['#fb3', '#00c851', '#ff3547'],
        view: [400, 400],
      },
      data: [
        {
          name: 'Skipped Questions',
          value: metrics?.skipped,
        },
        {
          name: 'Correct Questions',
          value: metrics?.correct,
        },
        {
          name: 'Incorrect Questions',
          value: metrics?.incorrect,
        },
      ],
    });

    this.assignmentChartData.push({
      type: 'Stacked Bar Chart',
      title: 'Marks Statistics',
      config: {
        colorScheme: ['#fb3', '#00c851', '#ff3547'],
        view: [400, 400],
      },
      data: [
        {
          name: 'Skipped Marks',
          series: [
            {
              name: 'Skipped Marks',
              value: metrics?.skippedMarks,
            },
          ],
        },
        {
          name: 'Positive Marks',
          series: [
            {
              name: 'Positive Marks',
              value: metrics?.positiveMarks,
            },
          ],
        },
        {
          name: 'Negative Marks',
          series: [
            {
              name: 'Negative Marks',
              value: metrics?.negativeMarks,
            },
          ],
        },
      ],
    });
  }
}
