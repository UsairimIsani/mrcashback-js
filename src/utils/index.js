// // import Vue from "../main";
// // Database to Store Users and Images
// const createDataBaseLocal = () => {
//   return new Promise((resolve, reject) => {
//     let db;
//     const DBOpenRequest = window.indexedDB.open("mrcashback", 1);
//     // Opening Database at Version 1

//     // Creating Object Stores
//     DBOpenRequest.onupgradeneeded = function(e) {
//       db = DBOpenRequest.result;
//       db.createObjectStore("images", { autoIncrement: true });
//       db.createObjectStore("users", { autoIncrement: true });
//     };
//     DBOpenRequest.onsuccess = function(event) {
//       // store the req of opening the database in the db variable.
//       db = DBOpenRequest.result;
//       // Resolving Database after Object Store Creation
//       // This db will be used for CRUD Operations.
//       resolve(db);
//     };
//   });
// };
// const addAdmin = db => {
//   const transaction = db.transaction("users", "readwrite");
//   const oS = transaction.objectStore("users");
//   transaction.onsuccess = function(e) {
//     console.log(e);
//   };
//   oS.getAll()
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   oS.add({
//     email: "admin@mrcashback",
//     password: "!Mrcashback123",
//     token: "",
//     verified: true,
//     admin: true
//   });
// };
// const db = (async () => {
//   const db = await createDataBaseLocal();
//   addAdmin(db);
//   return db;
// })();

import { openDB } from "idb";
const dbName = "mrcashback";
const dbVersion = 1;
const userStoreName = "userStore";
const imgStore = "imageStore";
const emailIndex = "email";
async function getDB() {
  const db = openDB(dbName, dbVersion, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const userStore = db.createObjectStore(userStoreName, {
        // Use Id
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      });
      userStore.createIndex(emailIndex, emailIndex);
      db.createObjectStore(imgStore, {
        // Use Id
        keyPath: "id",
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      });
    },
    blocked() {
      console.log("DB BLOCKED.");
    },
    blocking() {
      console.log("DB BLOCKING.");
    },
    terminated() {
      console.log("DB TERMINATED.");
    }
  });
  return db;
}
export const client = {
  get(url) {
    if (url === "user/me") {
    }
  },
  async post(url, payload) {
    if (url === `user/register?signin=${payload.signIn}`) {
      const db = getDB();
      return (await db).put(userStoreName, payload);
    } else if (`user/login`) {
      const db = getDB();
      console.log(payload);
      return (await db).getFromIndex(userStoreName, emailIndex, payload.email);
    }
  }
};
const createAdmin = async () => {
  const db = await getDB();
  const admin = await db.getFromIndex(
    userStoreName,
    emailIndex,
    "admin@mrcashback.com"
  );
  if (!admin) {
    db.put(userStoreName, {
      email: "admin@mrcashback.com",
      password: "!Mrcashback123",
      token: "",
      verified: true,
      admin: true
    });
  }
};
createAdmin();
export const auth = {
  isLoggedIn() {
    return true;
  },
  isAdmin() {
    return true;
  }
};
