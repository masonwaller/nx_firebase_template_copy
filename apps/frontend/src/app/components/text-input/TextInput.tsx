import React from 'react';

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  id: string;
  autoComplete?: string;
  wrapperclassname?: string;
  note?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  id,
  autoComplete = undefined,
  ...props
}) => {
  return (
    <div
      className={`sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 ${
        props.wrapperclassname || ''
      }`}
    >
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {label}
        </label>
        {props.note && (
          <p className="mt-1 text-gray-500" style={{ fontSize: '12px' }}>
            {props.note}
          </p>
        )}
      </div>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="text"
          name={name}
          id={id}
          autoComplete={autoComplete}
          className="max-w-lg block w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          {...props}
        />
      </div>
    </div>
  );
};