import api from './api';

type Params = {
  introduction: string;
  imageFile?: File;
};

async function editProfile({ introduction, imageFile }: Params) {
  const formData = new FormData();
  formData.append('image', imageFile || new Blob());
  formData.append(
    'profileRequestDto',
    new Blob([JSON.stringify({ introduction })], {
      type: 'application/json',
    })
  );
  await api.post('/profile/create', formData);
}

export default editProfile;
