export function models(): string {
  return 'models';
}

export interface UserInterface {
  id: string;
  active: boolean;
  email: string;
  firstName: string;
  lastName: string;
  group: string | null;
  cohort: string | null;
  phase: string;
  phoneNumber: string;
  roles: UserRoles[];
  startDate: string;
  status: string;
  onboarding: OnboardingSteps;
  photoURL: string | null;
  lastLoggedIn: string;
}
export interface OnboardingSteps {
  initial: boolean;
}

export enum UserRoles {
  ADMIN = 'Admin',
  USER = 'User'
}
