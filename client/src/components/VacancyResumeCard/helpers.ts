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

function getYearWordVacancy(years: number) {
  let strYears = String(years);
  if (strYears.at(-1) === '1' && years !== 11) {
    return 'року';
  }
  return 'років';
}

function getExpirienceStrVacancy(experience: number) {
  if (experience === 0) {
    return 'Без досвіду роботи';
  }
  return `Досвід роботи від ${experience} ${getYearWordVacancy(experience)}`;
}

function getYearWordResume(years: number) {
  let strYears = String(years);
  if (strYears.at(-1) === '1' && years !== 11) {
    return 'рік';
  }
  if (['2', '3', '4'].includes(String(strYears.at(-1)))) {
    return 'роки';
  }
  return 'років';
}

function getExpirienceStrResume(experience: number) {
  if (experience === 0) {
    return 'Без досвіду роботи';
  }
  return `Досвід роботи ${experience} ${getYearWordResume(experience)}`;
}

function getOnlineStr(online: boolean) {
  if (online) {
    return 'Віддалена робота';
  }
  return '';
}

function getFormattedRatingScore(ratingScore: number) {
  return new Intl.NumberFormat('uk', {
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(ratingScore * 100);
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

const languageTranslation = {
  aa: 'Афарська',
  ab: 'Абхазька',
  ae: 'Авестійська',
  af: 'Африкаанс',
  ak: 'Аканська',
  am: 'Амхарська',
  an: 'Арагонська',
  ar: 'Арабська',
  as: 'Ассамська',
  av: 'Аварська',
  ay: 'Аймара',
  az: 'Азербайджанська',
  ba: 'Башкирська',
  be: 'Білоруська',
  bg: 'Болгарська',
  bh: 'Біхарі',
  bi: 'Біслама',
  bm: 'Бамбарська',
  bn: 'Бенгальська',
  bo: 'Тибетська',
  br: 'Бретонська',
  bs: 'Боснійська',
  ca: 'Каталонська',
  ce: 'Чеченська',
  ch: 'Чаморро',
  co: 'Корсиканська',
  cr: 'Крі',
  cs: 'Чеська',
  cu: "Старослов'янська",
  cv: 'Чуваська',
  cy: 'Валлійська',
  da: 'Данська',
  de: 'Німецька',
  div: 'Мальдівська',
  dv: 'Мальдівська',
  dz: 'Бхутанська',
  ee: 'Еве',
  el: 'Грецька',
  en: 'Англійська',
  eo: 'Есперанто',
  es: 'Іспанська',
  et: 'Естонська',
  eu: 'Баскська',
  fa: 'Перська',
  ff: 'Фульфульде',
  fi: 'Фінська',
  fj: 'Фіджійська',
  fo: 'Фарерська',
  fr: 'Французька',
  fy: 'Фризька',
  ga: 'Ірландська',
  gd: 'Шотландська гельська',
  gl: 'Галісійська',
  gn: 'Гуарані',
  gu: 'Гуджараті',
  gv: 'Менська',
  ha: 'Хауса',
  he: 'Іврит',
  hi: 'Гінді',
  ho: 'Хірі моту',
  hr: 'Хорватська',
  ht: 'Гаїтянська креольська',
  hu: 'Угорська',
  hy: 'Вірменська',
  hz: 'Гереро',
  ia: 'Інтерлінгва',
  id: 'Індонезійська',
  ie: 'Інтерлінгве',
  ig: 'Ігбо',
  ii: 'Сичуань І',
  ik: 'Інупіак',
  in: 'Індонезійська',
  io: 'Ідо',
  is: 'Ісландська',
  it: 'Італійська',
  iu: 'Інуктитут',
  iw: 'Іврит',
  ja: 'Японська',
  ji: 'Ідиш',
  jv: 'Яванська',
  jw: 'Яванська',
  ka: 'Грузинська',
  kg: 'Конго',
  ki: 'Кікуйю',
  kj: 'Куаньяма',
  kk: 'Казахська',
  kl: 'Гренландська',
  km: 'Кхмерська',
  kn: 'Каннада',
  ko: 'Корейська',
  kok: 'Конкані',
  kr: 'Канурі',
  ks: 'Кашмірська',
  ku: 'Курдська',
  kv: 'Комі',
  kw: 'Корнська',
  ky: 'Киргизька',
  kz: 'Киргизька',
  la: 'Латинська',
  lb: 'Люксембурзька',
  lg: 'Ганда',
  li: 'Лімбургійська',
  ln: 'Лінгала',
  lo: 'Лаоська',
  ls: 'Словенська',
  lt: 'Литовська',
  lu: 'Луба-Катанга',
  lv: 'Латиська',
  mg: 'Малагасійська',
  mh: 'Маршалльська',
  mi: 'Маорі',
  mk: 'Македонська',
  ml: 'Малаялам',
  mn: 'Монгольська',
  mo: 'Молдовська',
  mr: 'Маратхі',
  ms: 'Малайська',
  mt: 'Мальтійська',
  my: 'Бірманська',
  na: 'Науру',
  nb: 'Норвезька (Букмол)',
  nd: 'Північна ндебеле',
  ne: 'Непальська (Індія)',
  ng: 'Ндонга',
  nl: 'Голландська',
  nn: 'Норвезька (Нюнорск)',
  no: 'Норвезька',
  nr: 'Південна ндебеле',
  ns: 'Північний сото',
  nv: 'Навахо',
  ny: 'Чічева',
  oc: 'Окситанська',
  oj: 'Оджибва',
  om: '(Афан)/Оромо/Одіа',
  or: 'Одіа',
  os: 'Осетинська',
  pa: 'Панджабі',
  pi: 'Палі',
  pl: 'Польська',
  ps: 'Пушту',
  pt: 'Португальська',
  qu: 'Кетчуа',
  rm: 'Ретороманська',
  rn: 'Кірундійська',
  ro: 'Румунська',
  ru: 'Російська',
  rw: 'Кіньяруанда',
  sa: 'Санскрит',
  sb: 'Сорбська',
  sc: 'Сардинська',
  sd: 'Сіндхі',
  se: 'Саамська',
  sg: 'Санго',
  sh: 'Сербсько-хорватська',
  si: 'Сингальська',
  sk: 'Словацька',
  sl: 'Словенська',
  sm: 'Самоанська',
  sn: 'Шона',
  so: 'Сомалійська',
  sq: 'Албанська',
  sr: 'Сербська',
  ss: 'Сваті',
  st: 'Сесото',
  su: 'Суданська',
  sv: 'Шведська',
  sw: 'Суахілі',
  sx: 'Суту',
  syr: 'Сирійська',
  ta: 'Тамільська',
  te: 'Телугу',
  tg: 'Таджицька',
  th: 'Тайська',
  ti: 'Тигринья',
  tk: 'Туркменська',
  tl: 'Тагальська',
  tn: 'Сетсвана',
  to: 'Тонганська',
  tr: 'Турецька',
  ts: 'Тсонга',
  tt: 'Татарська',
  tw: 'Тві',
  ty: 'Таїтянська',
  ug: 'Уйгурська',
  uk: 'Українська',
  ur: 'Урду',
  us: 'Англійська',
  uz: 'Узбецька',
  ve: 'Венда',
  vi: "В'єтнамська",
  vo: 'Волапюк',
  wa: 'Валлонська',
  wo: 'Волоф',
  xh: 'Коса',
  yi: 'Ідиш',
  yo: 'Йоруба',
  za: 'Чжуан',
  zh: 'Китайська',
  zu: 'Зулуська',
};

export {
  capitalizeFirstLetter,
  getFormattedSalary,
  getYearWordVacancy,
  getExpirienceStrVacancy,
  getYearWordResume,
  getExpirienceStrResume,
  getOnlineStr,
  getFormattedRatingScore,
  educationTranslation,
  contractTranslation,
  languageTranslation,
};
