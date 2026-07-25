export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "exhibiting"
  | "finished"
  | "cancelled";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  pending: "\u7533\u8acb\u4e2d",
  approved: "\u627f\u8a8d\u6e08\u307f",
  rejected: "\u5374\u4e0b",
  exhibiting: "\u5c55\u793a\u4e2d",
  finished: "\u7d42\u4e86",
  cancelled: "\u4e2d\u6b62",
};

export interface ApplicationHistoryItem {
  id: string;
  showroomId: string;
  showroomName: string;
  categories: string[];
  periodFrom: string;
  periodTo: string;
  status: ApplicationStatus;
  rejectionReason?: string;
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
