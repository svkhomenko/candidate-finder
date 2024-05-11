import { Education, Contract } from '@prisma/client';
import { EDUCATION_ENUM } from '../consts/validation';

type IPageParams = {
  _start?: string;
  _end?: string;
};

const DEFAULT_PAGE_OPTIONS = {
  skip: 0,
  take: 10,
};

const getPageOptions = (params: IPageParams) => {
  if (!params) {
    return DEFAULT_PAGE_OPTIONS;
  }
  const { _start, _end } = params;
  if (!_start || !_end) {
    return DEFAULT_PAGE_OPTIONS;
  }
  const skip = Number(_start);
  const take = Number(_end) - skip;

  return { skip, take };
};

const getEducationOptions = (education: Education, greater: boolean): Education[] => {
  let index = EDUCATION_ENUM.findIndex((edu) => edu === education);
  if (index === -1) {
    return [];
  }

  let result = [];
  if (greater) {
    for (let i = index; i < EDUCATION_ENUM.length; i++) {
      result.push(EDUCATION_ENUM[i]);
    }
  } else {
    for (let i = 0; i <= index; i++) {
      result.push(EDUCATION_ENUM[i]);
    }
  }
  return result;
};

const getContractOptions = (contract: Contract): Contract[] => {
  return [contract, 'any'];
};

export { getPageOptions, getEducationOptions, getContractOptions };
