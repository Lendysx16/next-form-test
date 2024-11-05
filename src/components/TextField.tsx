'use client';

import { useMask } from '@react-input/mask';
import { InputHTMLAttributes, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  label?: string;
  mask?: string;
}

export const TextField = ({ className, errorMessage, label, mask, ...props }: Props) => {
  const maskedRef = useMask({ mask: mask || '', replacement: { _: /\d/ } });
  const inputRef = useRef<HTMLInputElement>(null);
 
  return (
    <div className={twMerge('flex w-full flex-col gap-3', className)}>
      {label && <label className="select-none text-base text-[#1d1d1ddd]">{label}</label>}
      <div
        className={twMerge(
          'flex min-h-[58px] w-full cursor-text items-center justify-between rounded-md border border-[#00000050] px-5 has-[:focus]:border-foreground',
          errorMessage && '!border-danger gap-5'
        )}
        onClick={() => {
          inputRef.current?.focus();
          maskedRef.current?.focus();
        }}>
        <input
          ref={mask ? maskedRef : inputRef}
          {...props}
          className="w-full flex-[3] border-none py-3 focus:outline-none"
        />
        {errorMessage && (
          <span className="flex-1 text-right text-sm leading-4 text-danger"> {errorMessage} </span>
        )}
      </div>
    </div>
  );
};
