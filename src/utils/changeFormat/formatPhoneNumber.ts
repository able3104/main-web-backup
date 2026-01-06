const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
  const length = cleaned.length;
  let formatted = "";

  // 앞자리가 02인 경우 (서울)
  if (cleaned.startsWith("02")) {
    if (length < 3) {
      formatted = cleaned;
    } else if (length < 6) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    } else if (length < 10) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(
        2,
        5
      )}-${cleaned.slice(5)}`;
    } else {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(
        2,
        6
      )}-${cleaned.slice(6, 10)}`;
    }
  }
  // 앞자리가 010인 경우 (11자리 휴대폰)
  else if (cleaned.startsWith("010")) {
    if (length < 4) {
      formatted = cleaned;
    } else if (length < 8) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        7
      )}-${cleaned.slice(7, 11)}`;
    }
  }
  // 그 외 10자리 번호 (지역번호, 구형 휴대폰 등)
  else {
    if (length < 4) {
      formatted = cleaned;
    } else if (length < 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6, 10)}`;
    }
  }
  return formatted;
};

export default formatPhoneNumber;
