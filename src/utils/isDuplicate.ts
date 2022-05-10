import api from './api';
import getValidationSchema from './getValidationSchema';

type Type = 'email' | 'nickname';

async function isDuplicate(type: Type, value: string): Promise<boolean> {
  const isValid = await checkValidation(type, value);
  if (!isValid) return false;

  const { data } = await api.get(
    `/member/checkDuplicateBy${capitalize(type)}/${value}`
  );
  return data;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const checkValidation = async (type: Type, value: string): Promise<boolean> => {
  const schema = getValidationSchema(type);
  return await schema.isValid(value);
};

export default isDuplicate;
