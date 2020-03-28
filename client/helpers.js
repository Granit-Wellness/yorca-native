export const environmentURI = () => {
  const uris = {
    development: "http://localhost:9292/"
  };

  if (!process.env.NODE_ENV) {
    return uris.development;
  }

  return uris[process.env.NODE_ENV];
};
