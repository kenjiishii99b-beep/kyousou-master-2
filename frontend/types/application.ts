import { FacilityCode } from "./showroom";

// 展示申請（F06）用の型定義
// 仕様書 3.2「/api/applications」相当を想定

export interface ApplicationFormData {
  showroomId: string;
  showroomName: string;
  periodFrom: string;
  periodTo: string;
  categories: FacilityCode[];
  exhibitTitle: string;
  exhibitDescription: string;
}

export const EMPTY_APPLICATION_FORM: ApplicationFormData = {
  showroomId: "",
  showroomName: "",
  periodFrom: "",
  periodTo: "",
  categories: [],
  exhibitTitle: "",
  exhibitDescription: "",
};
