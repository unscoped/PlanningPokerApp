export const useUrlParam = (key: string) => {
  const search = window.location.search;

  const params = new URLSearchParams(search);

  return params.get(key) || undefined;
};
