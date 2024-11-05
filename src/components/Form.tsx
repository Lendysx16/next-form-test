'use client';

import musicGenres from '@/data/music-genres';
import { SelectWithSearch } from './SelectWithSearch';
import { TextField } from './TextField';
import { TextArea } from './TextArea';
import countriesArray from '@/data/countries';
import { Pagination } from './Pagination';
import { RoundButton } from './RoundButton';
import { useEffect, useMemo, useState } from 'react';

export const Form = () => {
  const [page, setPage] = useState(1);

  const [values, setValues] = useState<{
    country: (typeof countriesArray)[0] | null;
    selectedGenre: (typeof musicGenres)[0] | null;
    name: string;
    format: string;
    number: string;
    cost: string;
    synopsis: string;
  }>({
    country: null,
    selectedGenre: null,
    name: '',
    format: '',
    number: '',
    cost: '',
    synopsis: ''
  });

  const errors = useMemo(() => {
    const errors: Record<string, string> = {};

    if (!values.name) {
      errors.name = 'Заполните поле';
    }

    if (!values.selectedGenre) {
      errors.selectedGenre = 'Заполните поле';
    }

    if (values.number && !/^\d{3}-\d{3}-\d{3}-\d{3}-\d{3}$/.test(values.number)) {
      errors.number = 'Неверный формат';
    }

    if (!values.format) {
      errors.format = 'Заполните поле';
    }

    if (!values.country) {
      errors.country = 'Заполните поле';
    }

    return errors;
  }, [values]);

  const noErrors = useMemo(() => Object.keys(errors).length === 0, [errors]);

  useEffect(() => {
    if (localStorage.getItem('values')) {
      setValues(JSON.parse(localStorage.getItem('values')!));
    }
  }, [setValues]);

  useEffect(() => {
    localStorage.setItem('values', JSON.stringify(values));
  }, [values]);

  return (
    <form className="mt-28 flex flex-col items-center justify-between gap-20">
      <div className="flex w-full flex-col justify-between gap-x-40 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <TextField
            value={values.name}
            onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
            label="Название проекта"
            placeholder="Название"
            errorMessage={errors.name}
          />
          <SelectWithSearch
            label="Жанр"
            items={musicGenres}
            itemKey="key"
            itemValue="value"
            value={values.selectedGenre}
            onChange={(newGenre) => setValues((prev) => ({ ...prev, selectedGenre: newGenre }))}
            placeholder="Жанр"
            errorMessage={errors.selectedGenre}
          />
          <TextField
            value={values.format}
            onChange={(e) => setValues((prev) => ({ ...prev, format: e.target.value }))}
            label="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
            placeholder="Формат"
            errorMessage={errors.format}
          />
          <TextField
            label="№ УНФ или отсутствует"
            placeholder="890-000-000-00-000"
            mask="___-___-___-___-___"
            value={values.number}
            onChange={(e) => setValues((prev) => ({ ...prev, number: e.target.value }))}
            errorMessage={errors.number}
          />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <SelectWithSearch
            label="Страна-производитель (копродукция)"
            placeholder="Страна"
            value={values.country}
            onChange={(newCountry) =>
              setValues((prev) => {
                return { ...prev, country: newCountry };
              })
            }
            items={countriesArray}
            itemKey="key"
            itemValue="value"
            errorMessage={errors.country}
          />
          <TextField
            value={values.cost}
            onChange={(e) => setValues((prev) => ({ ...prev, cost: e.target.value }))}
            label="Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть"
            placeholder="Сметная стоимость"
            errorMessage={errors.cost}
          />
          <TextArea
            value={values.synopsis}
            onChange={(e) => setValues((prev) => ({ ...prev, synopsis: e.target.value }))}
            label="Синопсис"
            placeholder="Напишите краткое изложение"
            className="h-[170px] lg:h-auto lg:flex-[2]"
            errorMessage={errors.synopsis}
          />
        </div>
      </div>

      <div className="flex w-full flex-col justify-center gap-5 lg:relative lg:flex-row lg:justify-end">
        <Pagination
          lastPage={4}
          currentPage={page}
          firstPage={1}
          onPageChange={(e) => {
            setPage(e);
          }}
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        />

        <RoundButton
          variant={noErrors && page !== 4 ? 'default' : 'passive'}
          className="flex items-center justify-between"
          onClick={(e) => {
            e.preventDefault();
            if (noErrors && page != 4) setPage((prev) => prev + 1);
          }}>
          Следующий шаг{' '}
          <svg width="40" height="41" viewBox="0 0 40 41" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.0001 21.297C16.4478 21.297 16.0001 20.8493 16.0001 20.297C16.0001 19.7447 16.4478 19.297 17.0001 19.297L17.0001 21.297ZM30.7072 19.5899C31.0977 19.9804 31.0977 20.6136 30.7072 21.0041L24.3432 27.3681C23.9527 27.7586 23.3195 27.7586 22.929 27.3681C22.5385 26.9775 22.5385 26.3444 22.929 25.9539L28.5858 20.297L22.929 14.6401C22.5385 14.2496 22.5385 13.6165 22.929 13.2259C23.3195 12.8354 23.9527 12.8354 24.3432 13.2259L30.7072 19.5899ZM17.0001 19.297L30.0001 19.297L30.0001 21.297L17.0001 21.297L17.0001 19.297Z"
              fill="currentColor"
            />
          </svg>
        </RoundButton>
      </div>
    </form>
  );
};
