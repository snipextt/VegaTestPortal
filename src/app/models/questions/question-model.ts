import { QuestionAnswer } from './question-answer-model';
import { QuestionId } from './question-id-model';
import { QuestionOption } from './question-option-model';
export interface QuestionModel {
  answer: QuestionAnswer | undefined;
  createdBy: string | undefined;
  createdOn: string | undefined;
  description: string | undefined;
  fileName: string | undefined;
  id: QuestionId | undefined;
  lastUpdatedBy: string | undefined;
  lastUpdatedOn: string | undefined;
  name: string | undefined;
  negativeMark: number | undefined;
  options: QuestionOption[] | undefined;
  passageContent: string | undefined;
  passageId: string | undefined;
  positiveMark: number | undefined;
  skipMark: number | undefined;
  subject: string | undefined;
  tags: string[] | undefined;
  type: string | undefined;
  usedInPapers: {} | undefined;
  explanation_added: string;
}
