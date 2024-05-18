import { Resume, ResumeLanguageLevel, Language } from '@prisma/client';

type IScores = {
  cosSimilarity: number;
  salaryScore: number;
  experienceScore: number;
  educationScore: number;
  commonLanguages: Language[];
  contractScore: number;
};

function getYearWord(years: number) {
  let strYears = String(years);
  if (strYears.at(-1) === '1' && years !== 11) {
    return 'рік';
  }
  if (['2', '3', '4'].includes(strYears.at(-1))) {
    return 'роки';
  }
  return 'років';
}

function getExpirienceStr(experience: number) {
  if (experience === 0) {
    return 'Без досвіду роботи';
  }
  return `Досвід роботи ${experience} ${getYearWord(experience)}`;
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

function getLanguagesStr(commonLanguages: Language[]) {
  let langStr = 'мовами';
  if (commonLanguages.length === 1) {
    langStr = 'мовою';
  }

  return `Володіє ${langStr}: ${commonLanguages
    .map((lang) => languageTranslation[lang])
    .join(', ')}`;
}

function getBadges(
  resume: Resume & { resumeLanguageLevels: ResumeLanguageLevel[] },
  {
    cosSimilarity,
    salaryScore,
    experienceScore,
    educationScore,
    commonLanguages,
    contractScore,
  }: IScores,
) {
  let badges = [];

  if (cosSimilarity > 0.5) {
    badges.push('Опис резюме відповідає опису вакансії');
  }
  if (salaryScore) {
    badges.push('Співпадають зарплатні очікування');
  }
  if (experienceScore) {
    badges.push(getExpirienceStr(resume.experience));
  }
  if (educationScore) {
    badges.push(educationTranslation[resume.education]);
  }
  if (commonLanguages.length !== 0) {
    badges.push(getLanguagesStr(commonLanguages));
  }
  if (contractScore) {
    badges.push('Співпадає вид зайнятості');
  }

  return badges;
}

export default getBadges;

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
