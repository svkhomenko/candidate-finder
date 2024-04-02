function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFormattedSalary(salary: number) {
  return new Intl.NumberFormat('uk', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(salary);
}

function getYearWord(years: number) {
  let strYears = String(years);
  if (strYears.at(-1) === '1' && years !== 11) {
    return 'року';
  }
  return 'років';
}

export { capitalizeFirstLetter, getFormattedSalary, getYearWord };
