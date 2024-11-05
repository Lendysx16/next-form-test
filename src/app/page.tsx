import { RoundButton } from '@/components/RoundButton';
import { Form } from '@/components/Form';
import { Inter_Tight } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const interTightFont = Inter_Tight({ variable: '--font-inter' });

export default function Home() {
  return (
    <div className="m-auto h-[80svh] w-3/4 pt-20 xl:w-3/5">
      <div className="flex items-center justify-between gap-3">
        <h3
          className={twMerge(
            'max-w-[534px] font-sans text-2xl font-semibold lg:text-[48px] lg:leading-tight',
            interTightFont.className
          )}>
          Производственные параметры фильма
        </h3>

        <RoundButton > <Link href='/?reset=true'>Отменить заполнение  </Link></RoundButton>
      </div>

      <Form />


    </div>
  );
}
