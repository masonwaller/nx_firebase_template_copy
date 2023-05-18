import { ValidationResults, validState } from "../../shared/validation";

export const yourAccountInputNames: any = {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    userType: 'userType',
  };

  export const initYourAccountValidationState = (): ValidationResults => {
    const formState: any = {};
    for (const key in yourAccountInputNames) {
      const name = yourAccountInputNames[key];
      formState[name] = validState;
    }
    return formState;
  };