function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFormattedSalary(salaryMin: number, salaryMax: number) {
  if (salaryMin === salaryMax) {
    return new Intl.NumberFormat('uk', {
      currency: 'UAH',
      maximumFractionDigits: 0,
    }).format(salaryMin);
  }
  let sMin = new Intl.NumberFormat('uk', {
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(salaryMin);
  let sMax = new Intl.NumberFormat('uk', {
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(salaryMax);
  return sMin + ' - ' + sMax;
}

function getYearWord(years: number) {
  let strYears = String(years);
  if (strYears.at(-1) === '1' && years !== 11) {
    return 'року';
  }
  return 'років';
}

function getExpirienceStr(experience: number) {
  if (experience === 0) {
    return 'Без досвіду роботи';
  }
  return `Досвід роботи від ${experience} ${getYearWord(experience)}`;
}

const educationTranslation = {
  basic_general: 'Базова середня освіта',
  complete_general: 'Повна загальна середня освіта',
  junior_bachelor: 'Фахова передвища освіта',
  bachelor: 'Бакалавр',
  master: 'Магістер',
  doctor_philosophy_arts: 'Доктор філософії/доктор мистецтва',
  doctor_sciences: 'Доктор наук',
};

const contractTranslation = {
  full_time: 'Повна зайнятість',
  part_time: 'Неповна зайнятість',
  any: 'Повна зайнятість, неповна зайнятість',
};

export {
  capitalizeFirstLetter,
  getFormattedSalary,
  getYearWord,
  getExpirienceStr,
  educationTranslation,
  contractTranslation,
};
