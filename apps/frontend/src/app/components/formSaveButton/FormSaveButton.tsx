import React from 'react';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
interface Props {
  submittingForm: boolean;
  formIsValid: boolean;
  onClick: () => void;
}
export const FormSaveButton: React.FC<Props> = ({
  submittingForm,
  formIsValid,
  onClick,
}) => {
  return (
    <div className="py-2">
      <div className="flex justify-end">
        <div className="flex flex-col">
          <div>
            <button
              onClick={onClick}
              disabled={submittingForm}
              type="button"
              className="m-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {submittingForm ? 'Saving...' : 'Save'}
            </button>
          </div>
          {!formIsValid && <ErrorSpan message="Error: Check form input." />}
        </div>
      </div>
    </div>
  );
};