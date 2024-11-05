'use client';

import { SelectHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface Props<T> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  onChange?: (e: T) => void;
  errorMessage?: string;
  label?: string;
  items: T[];
  value: T | null;
  itemKey?: keyof T;
  itemValue?: keyof T;
  placeholder?: string;
}

export function SelectWithSearch<G, T extends { [key: string]: G }>({
  className,
  errorMessage,
  itemValue = 'name',
  itemKey = 'id',
  value,
  placeholder,
  label,
  onChange,
  ...props
}: Props<T>) {
  const [inputValue, setInputValue] = useState(String(value?.[itemValue] || ''));
  const [showOptions, setShowOptions] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function reverseCurrentValue(value: string) {
      setInputValue(value);
    }

    const ref = inputRef.current;

    setMounted(true);

    window.addEventListener('click', (e) => {
      if (e.target !== ref && !ref?.contains(e.target as Node)) {
        setShowOptions(false);
        reverseCurrentValue(String(value?.[itemValue] || ''));
      }
    });

    return () => {
      window.removeEventListener('click', (e) => {
        if (e.target !== ref && !ref?.contains(e.target as Node)) {
          setShowOptions(false);
          reverseCurrentValue(String(value?.[itemValue] || ''));
        }
      });
    };
  }, [setMounted, itemValue, value]);

  useEffect(() => {
    setInputValue(String(value?.[itemValue] || ''));
  }, [value, itemValue]);

  const inputRef = useRef<HTMLDivElement>(null);
  const portalElementRef = useRef<HTMLDivElement>(null);

  const filterItems = useMemo(() => {
    if (!showOptions) return [];
    if (!inputValue) return props.items;

    return props.items.filter((item) =>
      String(item[itemValue]).toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, props.items, itemValue, showOptions]);

  function calcPostition() {
    const positions = inputRef.current?.getBoundingClientRect();
    const docPostion = document.documentElement.getBoundingClientRect();
    if (!portalElementRef.current || !positions) return;

    const topPos = positions.bottom + 2 - docPostion.y;

    portalElementRef.current?.style.setProperty('top', `${topPos}px`);

    portalElementRef.current?.style.setProperty('left', `${positions.left}px`);
    portalElementRef.current?.style.setProperty('width', `${positions.width}px`);
  }

  function handleChange(item: T) {
    setShowOptions(false);
    setInputValue(String(item[itemValue]));
    onChange?.(item);
  }

  return (
    <div className={twMerge('flex w-full flex-col gap-3', className)}>
      {label && <label className="select-none text-base text-[#1d1d1ddd]">{label}</label>}
      <div
        ref={inputRef}
        className={twMerge(
          'relative flex min-h-[58px] w-full cursor-text items-center justify-between rounded-md border border-[#00000050] px-5 has-[:focus]:border-foreground',
          errorMessage && '!border-danger gap-5'
        )}
        onClick={() => {
          calcPostition();
          inputRef.current?.focus();
          setInputValue('');
          setShowOptions(true);
        }}>
        <input
          className="w-full flex-[3] border-none py-3 focus:outline-none"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {mounted &&
          createPortal(
            <div
              ref={portalElementRef}
              className={twMerge(
                'absolute z-50 max-h-[350px] overflow-y-auto border bg-white opacity-100 shadow-md transition-[opacity] duration-200',
                !(showOptions && filterItems.length) && 'pointer-events-none opacity-0'
              )}>
              {filterItems.map((item) => (
                <li
                  key={String(item[itemKey])}
                  data-value={item[itemKey]}
                  className="block cursor-pointer border-b border-[#00000050] p-4 last:border-0 hover:bg-accent-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(item);
                  }}>
                  {String(item[itemValue])}
                </li>
              ))}
            </div>,
            document.body
          )}

        {errorMessage && (
          <span className="flex-1 text-right text-sm leading-4 text-danger"> {errorMessage} </span>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(
            'size-5 rotate-0 text-[#00000050] transition-[transform]',
            showOptions && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
