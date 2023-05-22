/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

export interface DropDownOption {
  value: string | number;
  name: string;
}

interface IProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  values: Array<DropDownOption>;
  name: string;
  placeholder?: string;
}

const DropdownSelect: React.FC<IProps> = ({
  label = undefined,
  values,
  name,
  placeholder = 'Select an Option',
  ...props
}) => {
  const [selected, setSelected] = useState<string>();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };
  return (
    <>
      {label && (
        <label
          id={`${label.toLowerCase().replace(' ', '_')}-label`}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative">
        <select
          {...props}
          name={name}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          aria-expanded="true"
          onChange={handleSelect}
        >
          <option value="">{placeholder}</option>
          {values.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropdownSelect;