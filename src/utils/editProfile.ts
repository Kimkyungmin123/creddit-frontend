import { User } from 'types';
import api from './api';

type Params = {
  introduction: string;
  imageFile?: File | Blob | null;
};

async function editProfile({ introduction, imageFile }: Params) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append(
    'profileRequestDto',
    new Blob([JSON.stringify({ introduction })], {
      type: 'application/json',
    })
  );
  const response = await api.post<User>('/profile/create', formData);
  return response;
}

export default editProfile;
