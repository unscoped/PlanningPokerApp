export const useUrlParam = (key: string): string | undefined => {
  const search = window.location.search;

  const params = new URLSearchParams(search);

  return params.get(key) || undefined;
};
