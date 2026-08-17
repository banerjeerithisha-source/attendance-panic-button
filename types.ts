export interface Subject {
  id: number;
  name: string;
  attendedClasses: number;
  totalClasses: number;
  targetPercentage: number;
}

export interface UserConfig {
  name: string;
  college: string;
  semester: string;
  globalTargetPercentage: number;
}
