import { openDB } from "idb";

// Database Name
const dbName = "mrcashback";

// Database Version
const dbVersion = 1;

// User Store akin to table(SQL) or collection(NoSQL)
const userStoreName = "userStore";

// Image Store
const imgStore = "imageStore";

// DB index, Makes searchable by email.
const emailIndex = "email";

// Create a DB and Return a Connection to the DB.
async function getDB() {
  // dbVersion opens the version specified

  const db = openDB(dbName, dbVersion, {
    // upgrade(db, oldVersion, newVersion, transaction) Called if this version of the database has never been opened before.
    // Use it to specify the schema for the database.
    // This is similar to the upgradeneeded event in plain IndexedDB.

    upgrade(db, _oldVersion, _newVersion, _transaction) {
      // db: An enhanced IDBDatabase.
      // oldVersion: Last version of the database opened by the user.
      // newVersion: New DB Version created.
      // transaction: An enhanced transaction for this upgrade.
      // This is useful if you need to get data from other stores as part of a migration.

      const userStore = db.createObjectStore(userStoreName, {
        // Use ID as key for DB
        keyPath: "id",
        // Auto increments id.
        autoIncrement: true
      });
      // Adds Email as Index.
      // Indexing by email makes DB searchable for documents based on email.

      userStore.createIndex(emailIndex, emailIndex);

      db.createObjectStore(imgStore, {
        // Use ID as key for DB
        keyPath: "id",
        // Auto increments id.
        autoIncrement: true
      });
    },
    blocked() {
      // Called if the database already exists and there are open connections
      // that don’t close in response to a versionchange event,
      // the request will be blocked until they all close.
      console.log("DB BLOCKED.");
    },
    blocking() {
      // Called if this connection is blocking a future version of the database from opening.
      // This is similar to the versionchange event in plain IndexedDB.
      console.log("DB BLOCKING.");
    },
    terminated() {
      // Called if the browser abnormally terminates the connection,
      // but not on regular closures like calling db.close().
      // This is similar to the close event in plain IndexedDB.
      console.log("DB TERMINATED.");
    }
  });
  return db;
}
// MOCK API
export const client = {
  get(url) {
    // API for Verify Me
    if (url === "user/me") {
    }
  },

  async post(url, payload) {
    // API for User Registration
    if (url === `user/register?signin=${payload.signIn}`) {
      const db = getDB();
      // TODO : Need to hash Password before saving to DB.
      return (await db).put(userStoreName, payload);
      // API for User Login
    } else if (`user/login`) {
      const db = getDB();
      // TODO:  Verify Login Password
      return (await db).getFromIndex(userStoreName, emailIndex, payload.email);
    }
    // TODO : API for Images
    // TODO : POST to DB.
    // TODO : GET from DB
    // TODO : GET ALL
    // TODO : Update via User
    // TODO : Update via Admin
  }
};
// IIFE to add Mock Admin User
(async () => {
  const db = await getDB();
  // Check If Mock Admin User is present.
  const admin = await db.getFromIndex(
    userStoreName,
    emailIndex,
    // Mock Admin User Email
    // To be used for Admin Privileges
    "admin@mrcashback.com"
  );
  // If no admin User, Add.
  if (!admin) {
    db.put(userStoreName, {
      // Mock Admin User
      email: "admin@mrcashback.com",
      password: "!Mrcashback123", // TODO : Need to hash
      token: "",
      verified: true,
      admin: true
    });
  }
  db.close();
})();

// Auth Guard
// TODO : Implement Real Auth Guard
export const auth = {
  isLoggedIn() {
    return true;
  },
  isAdmin() {
    return true;
  }
};

// Bare metal Usage of IndexDB.
// Erroneous and Time consuming
// import Vue from "../main";
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
