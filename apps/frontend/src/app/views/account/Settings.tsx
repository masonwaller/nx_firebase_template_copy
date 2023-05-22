/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { yourAccountInputNames } from './validation';
import { greyBorderClassName } from './styles';
import { TextInput } from '../../components/text-input/TextInput';
import DropdownSelect from '../../components/dropdown-select/DropdownSelect';

interface IProps {
  formData: { firstName: string; lastName: string; userType: string };
  userEmail: string;
  updateFormData: (data: any) => void;
}

export const Settings: React.FC<IProps> = ({
  formData,
  userEmail,
  updateFormData,
}) => {
  return (
    <div>
      <div className="space-y-2 sm:space-y-2 py-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Personal Settings
        </h3>
        <div className="space-y-2 sm:space-y-2">
          <TextInput
            name={yourAccountInputNames.firstName}
            id={yourAccountInputNames.firstName}
            label="First Name"
            wrapperclassname={greyBorderClassName}
            defaultValue={formData.firstName}
          />
          <TextInput
            name={yourAccountInputNames.lastName}
            id={yourAccountInputNames.lastName}
            label="Last Name"
            wrapperclassname={greyBorderClassName}
            defaultValue={formData.lastName}
          />
          <TextInput
            name={yourAccountInputNames.email}
            id={yourAccountInputNames.email}
            label="Email"
            wrapperclassname={greyBorderClassName}
            defaultValue={userEmail}
            type="email"
            disabled
            style={{ cursor: 'not-allowed' }}
          />
          <div
            className={`${greyBorderClassName} sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5`}
          >
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Account Type
            </label>
            <DropdownSelect
              name={yourAccountInputNames.userType}
              values={[
                { value: 'Reader', name: 'Reader' },
                { value: 'Author', name: 'Author' },
                { value: 'Reader/Author', name: 'Reader/Author' },
              ]}
              value={formData.userType}
              onChange={(e: any) => updateFormData({ userType: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};