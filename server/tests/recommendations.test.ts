import { test, expect, describe, jest } from '@jest/globals';
import { Recommendations } from '../recommendation/recommendation';

jest.mock('../recommendation/clusterization/cosine-similarity', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 0.5),
  };
});

describe('test recommendation', () => {
  test('countCosSimilarity function returns correct cosSimilarity value', () => {
    const thisObj = {
      termDocumentMatrix: [
        [0, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
      ],
      documents: [
        {
          id: 1,
          textArr: [''],
          type: 'vacancy' as const,
        },
        {
          id: 2,
          textArr: [''],
          type: 'resume' as const,
        },
      ],
    };
    const countCosSimilarity = Recommendations.prototype.countCosSimilarity.bind(thisObj);

    const vacancyIndex = 0;
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

    const result = countCosSimilarity(vacancyIndex, resume);

    expect(result).toEqual(0.5);
  });

  test('getRecommendedResumesDocuments function returns all resumes from vacancy cluster', () => {
    const resumeDocument1 = {
      id: 2,
      textArr: [''],
      type: 'resume' as const,
    };
    const vacancyDocument2 = {
      id: 3,
      textArr: [''],
      type: 'vacancy' as const,
    };
    const resumeDocument3 = {
      id: 4,
      textArr: [''],
      type: 'resume' as const,
    };
    const thisObj = {
      kmeansResult: {
        clusterIndexes: [1, 0, 1, 1],
      },
      documents: [
        {
          id: 1,
          textArr: [''],
          type: 'vacancy' as const,
        },
        resumeDocument1,
        vacancyDocument2,
        resumeDocument3,
      ],
    };

    const getRecommendatedResumesDocuments =
      Recommendations.prototype.getRecommendatedResumesDocuments.bind(thisObj);

    const vacancyIndex = 0;

    const asExpected = [resumeDocument3];

    const result = getRecommendatedResumesDocuments(vacancyIndex);

    expect(result).toStrictEqual(asExpected);
  });

  test('getRecommendedResumes function fails with error, vacancy does not exist', async () => {
    const thisObj = {
      documents: [],
    };

    const getRecommendatedResumes = Recommendations.prototype.getRecommendatedResumes.bind(thisObj);

    const asExpected = {
      message:
        'No such vacancy in recommendation found or provided description is not full enought to find recommendation',
      status: 404,
    };

    await expect(getRecommendatedResumes(1)).rejects.toMatchObject(asExpected);
  });

  test('getRecommendedResumes function returns recommended resumes from store', async () => {
    const recommendatedResumes = [
      {
        id: 1,
        ratingScore: 0.4,
        badges: [],
      },
    ];
    const thisObj = {
      documents: [
        {
          id: 0,
          type: 'vacancy' as const,
          recommendatedResumes,
        },
      ],
    };

    const getRecommendatedResumes = Recommendations.prototype.getRecommendatedResumes.bind(thisObj);

    await expect(getRecommendatedResumes(0)).resolves.toStrictEqual(recommendatedResumes);
  });
});
