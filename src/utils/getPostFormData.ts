type Params = {
  values: { title: string; content: string };
  imageFile?: File | Blob | null;
};

function getPostFormData({ values, imageFile }: Params) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append(
    'requestDto',
    new Blob([JSON.stringify(values)], {
      type: 'application/json',
    })
  );
  return formData;
}

export default getPostFormData;
