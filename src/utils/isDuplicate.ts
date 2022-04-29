import api from './api';

async function isDuplicate(type: 'email' | 'nickname', value: string) {
  const { data } = await api.get(
    `/member/checkDuplicateBy${capitalize(type)}/${value}`
  );
  return data;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default isDuplicate;
