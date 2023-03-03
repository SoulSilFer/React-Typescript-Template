import { TFunction } from 'react-i18next';

export type IMCValues = {
  height: string;
  weight: string;
  result: string;
};

export const initialIMCValues: IMCValues = {
  height: '',
  weight: '',
  result: ''
};

export const ImcTableValues = (t: TFunction<'translation', undefined>) => {
  const obj = {
    headers: [`${t('bmi')}`, `${t('classification')}`, `${t('obesityGrade')}`],
    rows: [
      [`${t('below')} 17`, `${t('veryUnderweight')}`, `0`],
      [`${t('inBetween')} 17 ${t('and')} 18,49`, `${t('thinness')}`, `0`],
      [`${t('inBetween')} 18,5 ${t('and')} 24,9`, `Normal`, `0`],
      [`${t('inBetween')} 25,0 ${t('and')} 29,9`, `${t('overweight')}`, `I`],
      [
        `${t('inBetween')} 30,0 ${t('and')} 39,9`,
        `${t('obesity')}`,
        `II (${t('severe')})`
      ],
      [
        `${t('biggerThen')} 40,0`,
        `${t('severeObesity')}`,
        `III (${t('morbid')})`
      ]
    ]
  };
  return obj;
};

export const calculateIMC = (height: number, weight: number): number => {
  return parseFloat((weight / (height * height)).toFixed(2));
};

export const getIMCResult = (
  imc: number,
  t: TFunction<'translation', undefined>
): string => {
  if (imc < 17) {
    return t('veryUnderweight');
  } else if (imc >= 17 && imc <= 18.49) {
    return t('thinness');
  } else if (imc >= 18.5 && imc <= 24.9) {
    return 'Normal';
  } else if (imc >= 25 && imc <= 29.9) {
    return t('overweight');
  } else if (imc >= 30 && imc <= 39.9) {
    return t('obesity');
  } else {
    return t('severeObesity');
  }
};
