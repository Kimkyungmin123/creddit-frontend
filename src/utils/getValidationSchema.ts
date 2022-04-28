import ERRORS from 'constants/errors';
import { string } from 'yup';

type Type =
  | 'email'
  | 'nickname'
  | 'passwordLax'
  | 'passwordStrict'
  | 'newPassword'
  | 'newPasswordConfirm'
  | 'content'
  | 'comment';

function getValidationSchema(type: Type) {
  switch (type) {
    case 'email':
      return string().email(ERRORS.emailInvalid).required(ERRORS.emailRequired);
    case 'nickname':
      return string()
        .matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]+$/, ERRORS.nicknameInvalid)
        .min(2, ERRORS.nicknameShort)
        .max(10, ERRORS.nicknameLong)
        .required(ERRORS.nicknameRequired);
    case 'passwordLax':
      return string().required(ERRORS.passwordRequired);
    case 'passwordStrict':
      return string()
        .matches(
          /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\W)(?=\S+$).+/,
          ERRORS.passwordInvalid
        )
        .min(8, ERRORS.passwordShort)
        .max(20, ERRORS.passwordLong)
        .required(ERRORS.passwordRequired);
    case 'newPassword':
      return string().required(ERRORS.newPasswordRequired);
    case 'newPasswordConfirm':
      return string().required(ERRORS.newPasswordConfirmRequired);
    case 'content':
      return string().max(2000, ERRORS.contentLong);
    case 'comment':
      return string().required(ERRORS.commentRequired);
  }
}

export default getValidationSchema;
