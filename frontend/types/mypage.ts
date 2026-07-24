// マイページ用の型定義
// 仕様書 3.2「/api/mypage」相当を想定

export type ApplicationStatus = "pending" | "exhibiting" | "finished" | "cancelled";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  pending: "予定",
  exhibiting: "展示中",
  finished: "終了",
  cancelled: "中止",
};

export interface ApplicationHistoryItem {
  id: string;
  showroomId: string;
  showroomName: string;
  categories: string[];
  periodFrom: string;
  periodTo: string;
  status: ApplicationStatus;
}

export interface ReportHistoryItem {
  id: string;
  title: string;
  date: string;
  downloadUrl: string;
}

export interface ProfileInfo {
  lastName: string;
  firstName: string;
  companyName: string;
  email: string;
  phone: string;
}

export interface MypageResponse {
  profile: ProfileInfo;
  applications: ApplicationHistoryItem[];
  reports: ReportHistoryItem[];
}
