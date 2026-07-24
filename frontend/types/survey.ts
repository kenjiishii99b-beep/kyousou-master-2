// アンケート回答（F10相当・来場者向け）用の型定義
// 仕様書 3.2「/api/surveys/{token}」相当を想定

export type SurveyQuestionType = "rating" | "text" | "choice";

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  label: string;
  required: boolean;
  options?: string[];
}

export interface SurveyDefinition {
  token: string;
  showroomName: string;
  exhibitTitle: string;
  questions: SurveyQuestion[];
}

export type SurveyAnswerValue = number | string;

export type SurveyAnswers = Record<string, SurveyAnswerValue>;
