export const lengthValidFn = (input: string): [boolean, string?] => {
  return [input.length === 10, "Số điện thoại không hợp lệ (không đủ 10 số)"];
};

export const passValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 6, "Mật khẩu cần ít nhất 6 ký tự"];
};

export const nameValidFn = (input: string): [boolean, string?] => {
  return [input.trim() !== "", "Tên không để trống"];
};

export const passLengthValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 8, "Mật khẩu không đc ít hơn 8 kí tự"];
};

export const checkEqualPwd = (input: string, compareText: string): [boolean, string?] => {
  return [input === compareText, "Mật khẩu không khớp"];
};

export const checkPhoneValidFn = (input: string): [boolean, string?] => {
  return [input.length >= 10, "Số điện thoại phải có 10 số"];
};

export const checkPhoneValidFirstNumberFn = (input: string): [boolean, string?] => {
  return [input.length > 0 && input[0] === '0', "Số đầu tiên phải là số 0"];
};

export const emailValidFn = (input: string): [boolean, string?] => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return [input.length > 0 && reg.test(input), "Email không đúng định dạng"];
};

export const OTPValidFn = (input: string): [boolean, string?] => {
  return [input.trim() !== "", "Không được để trống"];
};

export const OTPLengthValidFn = (input: string): [boolean, string?] => {
  return [input.length == 6, "OTP phải gồm 6 kí tự"];
};
