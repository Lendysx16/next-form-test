import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'passive';
  onClick?: (e: React.MouseEvent) => void;
}

export const RoundButton = ({className, children, variant, ...props}: Props) => {
  variant = variant || 'default';
  let styles = '';

  switch (variant) {
    case 'default':
      styles = 'border border-[#1213131f]';
      break;
    case 'passive':
      styles = 'bg-[#EFEFEF] text-[#ACACAC]';
  }

  return (
    <button className={twMerge(className, styles, 'h-[48px] rounded-[41px] px-10')} {...props}>
      {children}
    </button>
  );
};
