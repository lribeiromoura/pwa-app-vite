import PouchDB from "pouchdb";

export const createLocalDB = (formName: string) =>
  new PouchDB<FormData>(formName);
