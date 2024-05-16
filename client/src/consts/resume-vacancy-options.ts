const contractOptions = [
  {
    value: 'full_time',
    label: 'Повна',
  },
  {
    value: 'part_time',
    label: 'Неповна',
  },
];

const educationOptions = [
  {
    label: 'Базова середня освіта',
    value: 'basic_general',
  },
  {
    label: 'Повна загальна середня освіта',
    value: 'complete_general',
  },
  {
    label: 'Фахова передвища освіта',
    value: 'junior_bachelor',
  },
  {
    label: 'Бакалавр',
    value: 'bachelor',
  },
  {
    label: 'Магістер',
    value: 'master',
  },
  {
    label: 'Доктор філософії/доктор мистецтва',
    value: 'doctor_philosophy_arts',
  },
  {
    label: 'Доктор наук',
    value: 'doctor_sciences',
  },
];

const SALARY_VALUE = '1';
const SALARY_RANGE = '2';

const salaryOptions = [
  {
    value: SALARY_VALUE,
    label: 'Значення',
  },
  {
    value: SALARY_RANGE,
    label: 'Діапазон',
  },
];

export { contractOptions, educationOptions, salaryOptions, SALARY_VALUE, SALARY_RANGE };
