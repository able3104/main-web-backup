/**
 * 통신사 관련 유틸리티 함수
 */

/**
 * UI 표시용 통신사명을 API/데이터베이스용으로 변환
 * @param displayName - UI에 표시되는 통신사명 (예: 'LG U+')
 * @returns API/DB에서 사용하는 통신사명 (예: 'LG U')
 */
export const normalizeCarrierName = (displayName: string): string => {
  if (displayName === 'LG U+') {
    return 'LG U';
  }
  return displayName;
};

/**
 * API/데이터베이스용 통신사명을 UI 표시용으로 변환
 * @param apiName - API/DB에서 사용하는 통신사명 (예: 'LG U')
 * @returns UI에 표시되는 통신사명 (예: 'LG U+')
 */
export const denormalizeCarrierName = (apiName: string): string => {
  if (apiName === 'LG U') {
    return 'LG U+';
  }
  return apiName;
};
