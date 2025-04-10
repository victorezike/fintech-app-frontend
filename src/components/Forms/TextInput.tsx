import React from 'react';
import { FieldProps } from 'formik';

interface TextInputProps extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({
  field,
  form,
  label,
  placeholder,
  type,
}) => {
  const error = form?.touched?.[field.name] && form?.errors?.[field.name];

  return (
    <div className="mb-4">
      <label htmlFor={field?.name} className="block text-sm font-medium text-[#0D0D0C]">
        {label}
      </label>
      <input
        id={field?.name}
        type={type}
        placeholder={placeholder}
        {...field}
        className={`mt-1 block w-full p-2 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    </div>
  );
};

export default TextInput;