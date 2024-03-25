// create a hook that sync with fetch

import { getAllFormData } from "../utils/indexedDB";

export const useSync = () => {
  const getData = async () => {
    const data = await getAllFormData("firstForm");
    console.log(data);
  };

  return { getData };
};
