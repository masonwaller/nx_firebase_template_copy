
export const validState: ValidationResult = { valid: true, message: '' };

export interface ValidationResult {
    valid: boolean;
    message: string;
  }

export interface ValidationResults {
    [key: string]: ValidationResult;
  }
  

export const isFormValid = (validationResults: ValidationResults) => {
    return Object.keys(validationResults).every(
      (resultKey) => validationResults[resultKey].valid === true
    );
  };