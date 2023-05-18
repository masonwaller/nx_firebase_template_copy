import React, { ReactHTMLElement } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  message: string;
}

const ErrorSpan: React.FC<Props> = ({ message, ...props }) => {
  return <span className="text-red-700 mt-1 italic" {...props}>{message}</span>;
};

export default ErrorSpan;
