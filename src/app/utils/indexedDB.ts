/* eslint-disable @typescript-eslint/no-explicit-any */
export const openDatabase = (objectName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("formDatabase", 1);

    request.onerror = () => {
      console.error("Erro ao abrir o banco de dados");
      reject(request.error);
    };

    request.onsuccess = () => {
      const db = request.result as IDBDatabase;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      const objectStore = db.createObjectStore(objectName, {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex(`${objectName}Index`, "data", { unique: false });
    };
  });
};

export const createTransaction = async (objectName: string, data: any) => {
  const db = await openDatabase(objectName);
  const transaction = db.transaction([objectName], "readwrite");
  const store = transaction.objectStore(objectName);
  const request = store.add({ data: data });

  request.onsuccess = () => {
    return "Data saved successfully";
  };

  request.onerror = () => {
    return "Error saving data";
  };
};

export const getAllFormData = async (
  objectName: string
): Promise<IDBRequest> => {
  const db = await openDatabase(objectName);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([objectName], "readonly");
    const objectStore = transaction.objectStore(objectName);
    const request = objectStore.getAll();

    request.onerror = () => {
      console.error("Error getting data");
      reject(request.error);
    };

    request.onsuccess = () => {
      const db = request;
      resolve(db);
    };
  });
};

export const clearAllData = async (objectName: string) => {
  const db = await openDatabase(objectName);
  const transaction = db.transaction([objectName], "readwrite");
  const objectStore = transaction.objectStore(objectName);
  objectStore.clear();
};
