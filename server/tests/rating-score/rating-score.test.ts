import { test, expect, describe } from '@jest/globals';
import getRatingScoreAndBadges from '../../recommendation/rating-score/rating-score';
import { toMatchCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({ toMatchCloseTo });

describe('test rating score and badges', () => {
  test('rating score and badges are correct when salary and education meet requirements', () => {
    const vacancy = {
      id: 1,
      title: 'title',
      description: 'description',
      salaryMin: 20000,
      salaryMax: 20000,
      experience: 5,
      education: 'bachelor' as const,
      place_id: 'place_id',
      address: 'address',
      online: false,
      contract: 'full_time' as const,
      userId: 1,
      vacancyLanguageLevels: [
        {
          language: 'uk' as const,
          vacancyId: 1,
          level: 'C2' as const,
        },
      ],
    };

    const resume = {
      id: 2,
      title: 'title',
      description: 'description',
      salaryMin: 18000,
      salaryMax: 22000,
      experience: 3,
      education: 'master' as const,
      place_id: 'place_id',
      address: 'address',
      online: false,
      contract: 'part_time' as const,
      userId: 2,
      resumeLanguageLevels: [
        {
          language: 'uk' as const,
          resumeId: 2,
          level: 'C1' as const,
        },
      ],
    };

    const cosSimilarity = 0.3;

    const asExpected = {
      ratingScore: 0.35714,
      badges: ['Співпадають зарплатні очікування', 'Магістер'],
    };

    (expect(getRatingScoreAndBadges(vacancy, resume, cosSimilarity)) as any).toMatchCloseTo(
      asExpected,
    );
  });

  test('rating score and badges are correct when everything meets requirements', () => {
    const vacancy = {
      id: 1,
      title: 'title',
      description: 'description',
      salaryMin: 20000,
      salaryMax: 20000,
      experience: 5,
      education: 'bachelor' as const,
      place_id: 'place_id',
      address: 'address',
      online: false,
      contract: 'full_time' as const,
      userId: 1,
      vacancyLanguageLevels: [
        {
          language: 'uk' as const,
          vacancyId: 1,
          level: 'C2' as const,
        },
      ],
    };

    const resume = {
      id: 2,
      title: 'title',
      description: 'description',
      salaryMin: 18000,
      salaryMax: 22000,
      experience: 8,
      education: 'master' as const,
      place_id: 'place_id',
      address: 'address',
      online: false,
      contract: 'any' as const,
      userId: 2,
      resumeLanguageLevels: [
        {
          language: 'uk' as const,
          resumeId: 2,
          level: 'C2' as const,
        },
      ],
    };

    const cosSimilarity = 0.7;

    const asExpected = {
      ratingScore: 0.89286,
      badges: [
        'Опис резюме відповідає опису вакансії',
        'Співпадають зарплатні очікування',
        'Досвід роботи 8 років',
        'Магістер',
        'Володіє мовою: Українська',
        'Співпадає вид зайнятості',
      ],
    };

    (expect(getRatingScoreAndBadges(vacancy, resume, cosSimilarity)) as any).toMatchCloseTo(
      asExpected,
    );
  });
});
