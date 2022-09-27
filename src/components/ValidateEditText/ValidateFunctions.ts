export const lengthValidFn = (input: string): [boolean, string?] => {
  return [input.length === 10, "Số điện thoại không hợp lệ (không đủ 10 số)"];
};

export const passValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 6, "Mật khẩu cần ít nhất 6 ký tự"];
};

export const nameValidFn = (input: string): [boolean, string?] => {
  return [input.trim() !== "", "Tên không để trống"];
};

export const nameLengthValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 6, "Tên không đc ít hơn 6 kí tự"];
};

export const checkEqualPwd = (input: string, compareText: string): [boolean, string?] => {
  return [input === compareText, "Mật khẩu không khớp"];
};

export const checkPhoneValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 8, "Số điện thoại chưa đúng format (<8 char)"];
};

export const checkPhoneValidFirstNumberFn = (input: string): [boolean, string?] => {
  return [input.length > 0 && input[0] === '0', "Số đầu tiên phải là số 0"];
};
