type Params = {
  title: string;
  content: string;
};

function getPostFormData({ title, content }: Params) {
  const formData = new FormData();
  formData.append(
    'requestDto',
    new Blob([JSON.stringify({ title, content })], {
      type: 'application/json',
    })
  );
  return formData;
}

export default getPostFormData;
