export interface SurveyUser {
  id: number;
  name: string;
  email: string;
  metroLocation: string;
  age: number;
  gender: string;
  skinType: string;
  city: string;
  appliedDate: string;
  timeTaken: string;
  status: "responded" | "opened";
  surveysParticipated: number;
  totalOrders: number;
  orderValue: number;
  surveyRewards: number;
}

export interface Permission {
  page: string;
  action: string[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePic: { _id: string; url: string }[];
  roleLabel: string;
  roleValue: string;
  permissions: Permission[];
}
