import { toast } from "react-toastify";
import { createLocalDB } from "../utils/PouchDb";
import { forms } from "../utils/formNames";

export const useSync = () => {
  const handleSyncData = async () => {
    try {
      const formNames = Object.values(forms).map((form) => form);
      await Promise.all(
        formNames.map(async (formName) => {
          const localDB = createLocalDB(formName.name);
          const docs = await localDB.allDocs({ include_docs: true });

          await Promise.all(
            docs.rows.map(async (row) => {
              const doc = row.doc;
              const postResponse = await fetch(formName.url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(doc),
              });
              const responseData = await postResponse.json();

              if (postResponse.ok) {
                console.log(
                  `Data from form ${formName.name} sent to API ${formName.url}:`,
                  responseData
                );
              }
            })
          );

          await localDB.destroy();
          console.log(
            `All data from form ${formName.name} synced successfully.`
          );
        })
      );
      toast("All data synced successfully.");
      console.log("All data synced successfully.");
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  };
  return { handleSyncData };
};
