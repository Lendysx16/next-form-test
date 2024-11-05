'use client';

import { TextareaHTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  label?: string;
}

export const TextArea = ({ className, errorMessage, label, ...props }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={twMerge('flex w-full flex-col gap-3', className)}>
      {label && <label className="select-none text-base text-[#1d1d1ddd]">{label}</label>}
      <div
        className={twMerge(
          'flex min-h-[58px] w-full flex-1 cursor-text items-center justify-between rounded-md border border-[#00000050] px-5 has-[:focus]:border-foreground',
          errorMessage && '!border-danger gap-5'
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}>
        <textarea
          ref={inputRef}
          {...props}
          className="size-full flex-1 resize-none border-none py-3 text-start focus:outline-none"
        />
      </div>
      {errorMessage && (
        <span className="flex-1 text-right text-sm leading-4 text-danger"> {errorMessage} </span>
      )}
    </div>
  );
};
