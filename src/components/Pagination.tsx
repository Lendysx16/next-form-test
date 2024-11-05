'use client';

import { twMerge } from 'tailwind-merge';

type Props = {
  firstPage: number;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination = (props: Props) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>, page: number) {
    e.preventDefault();
    e.stopPropagation();
    props.onPageChange(page);
  }

  const isFirstPage = props.currentPage === props.firstPage;
  const isLastPage = props.currentPage === props.lastPage;
  const diffToLastPage = props.lastPage - props.currentPage;
  const diffToFirstPage = props.currentPage - props.firstPage;
  const buttonStyle =
    'rounded-full h-[40px] w-[40px] text-[#00000080] flex items-center justify-center';

  return (
    <div className={twMerge('flex items-end justify-center gap-2', props.className)}>
      {!isFirstPage && (
        <button
          onClick={(e) => handleClick(e, props.currentPage - 1)}
          className="rotate-180 text-black">
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.0001 21.297C16.4478 21.297 16.0001 20.8493 16.0001 20.297C16.0001 19.7447 16.4478 19.297 17.0001 19.297L17.0001 21.297ZM30.7072 19.5899C31.0977 19.9804 31.0977 20.6136 30.7072 21.0041L24.3432 27.3681C23.9527 27.7586 23.3195 27.7586 22.929 27.3681C22.5385 26.9775 22.5385 26.3444 22.929 25.9539L28.5858 20.297L22.929 14.6401C22.5385 14.2496 22.5385 13.6165 22.929 13.2259C23.3195 12.8354 23.9527 12.8354 24.3432 13.2259L30.7072 19.5899ZM17.0001 19.297L30.0001 19.297L30.0001 21.297L17.0001 21.297L17.0001 19.297Z"
              fill="#121212"
            />
          </svg>
        </button>
      )}
      {diffToFirstPage >= 2 && (
        <>
          <button onClick={(e) => handleClick(e, props.firstPage)} className={buttonStyle}>
            {props.firstPage}
          </button>

          {diffToFirstPage > 2 && <span className={buttonStyle}>...</span>}
        </>
      )}

      {!isFirstPage && (
        <button
          onClick={(e) => handleClick(e, props.currentPage - 1)}
          className={twMerge(buttonStyle, '')}>
          {props.currentPage - 1}
        </button>
      )}

      <button
        onClick={(e) => handleClick(e, props.currentPage)}
        className={twMerge(buttonStyle, 'border-$[#00000020] border text-foreground')}>
        {props.currentPage}
      </button>

      {!isLastPage && (
        <button
          onClick={(e) => handleClick(e, props.currentPage + 1)}
          className={twMerge(buttonStyle, '')}>
          {props.currentPage + 1}
        </button>
      )}

      {diffToLastPage >= 2 && (
        <>
          {diffToLastPage > 2 && <span className={buttonStyle}>...</span>}
          <button onClick={(e) => handleClick(e, props.lastPage)} className={buttonStyle}>
            {props.lastPage}
          </button>
        </>
      )}

      {!isLastPage && (
        <button onClick={(e) => handleClick(e, props.currentPage + 1)}>
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.0001 21.297C16.4478 21.297 16.0001 20.8493 16.0001 20.297C16.0001 19.7447 16.4478 19.297 17.0001 19.297L17.0001 21.297ZM30.7072 19.5899C31.0977 19.9804 31.0977 20.6136 30.7072 21.0041L24.3432 27.3681C23.9527 27.7586 23.3195 27.7586 22.929 27.3681C22.5385 26.9775 22.5385 26.3444 22.929 25.9539L28.5858 20.297L22.929 14.6401C22.5385 14.2496 22.5385 13.6165 22.929 13.2259C23.3195 12.8354 23.9527 12.8354 24.3432 13.2259L30.7072 19.5899ZM17.0001 19.297L30.0001 19.297L30.0001 21.297L17.0001 21.297L17.0001 19.297Z"
              fill="#121212"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
