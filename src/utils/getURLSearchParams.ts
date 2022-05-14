function getURLSearchParams(obj: any) {
  const urlSearchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    urlSearchParams.append(key, obj[key]);
  });
  return urlSearchParams;
}

export default getURLSearchParams;
