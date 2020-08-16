import { openDB } from "idb";
// Login Auth guard key for LocalStorage
const login = "loggedIn";

// Admin Auth guard key for LocalStorage
const admin = "isAdmin";

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

// DB index for Images
const imgIndex = "id";
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

      const imageStore = db.createObjectStore(imgStore, {
        // Use ID as key for DB
        keyPath: "id",
        // Auto increments id.
        autoIncrement: true
      });
      imageStore.createIndex(imgIndex, imgIndex);
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

//! MOCK API
//! All this should be handled with a backend.

export const client = {
  async get(url) {
    // API for Verify Me

    if (url === `user/me`) {
    } else if (url.includes(`imgs`)) {
      url = url.split("/");
      if (url.length > 1) {
        // * Get user Id

        const userId = parseInt(url[1]);

        // * GET all images

        const db = getDB();

        //* GET User

        const user = await (await db).get(userStoreName, userId);

        // * Filter Images to Current Users

        const images = user.images.map(async e => (await db).get(imgStore, e));

        return Promise.all(images);
      } else {
        // * GET All Images of All Users - Admin

        const db = getDB();

        return (await db).getAll(imgStore);
      }
    } else if (url.includes(`img`)) {
      url = url.split("/");

      const imageId = parseInt(url[1]);

      // * GET all images

      const db = getDB();

      //* GET User

      return (await db).get(imgStore, imageId);
      //   const db = getDB();
      //   return (await db).get(imgStore, parseInt(url[1]));
    } else if (url === `users`) {
      const db = getDB();
      const users = await (await db).getAll(userStoreName);

      //! Needs Refactor
      //! Very Expensive
      users.forEach(user => {
        client
          .get(`imgs/${user.id}`)
          .then(images => {
            user.images = images.map(image => {
              return {
                ...image,
                url: URL.createObjectURL(image.blob)
              };
            });
          })
          .catch(e => console.log(e));
      });
      return users;
      //! Time Drain
      // let users = await (await db).getAll(userStoreName);
      // users = users.map(async user => {
      //   return {
      //     ...user,
      //     images: await user.images.map(async imageId => {
      //       return await (await db).get(imgStore, imageId);
      //     })
      //   };
      // });
      // return users;
    }
  },

  async post(url, payload) {
    // API POST

    // API for User Registration

    if (url === `user/register?signin=${payload.signIn}`) {
      // User Registration

      const db = getDB();

      // TODO : Need to hash Password before saving to DB.

      return (await db).put(userStoreName, payload);
      // END
    } else if (url === `user/login`) {
      // API for User Login

      const db = getDB();

      const user = await (await db).getFromIndex(
        userStoreName,
        emailIndex,
        payload.email
      );
      return new Promise((resolve, reject) => {
        if (user.password === payload.password) {
          delete user.password;
          localStorage.setItem(login, true);
          if (user.admin) {
            localStorage.setItem(admin, true);
          } else {
            localStorage.setItem(admin, false);
          }
          resolve(user);
        } else {
          reject(
            new Error({
              message: "Unauthorized"
            })
          );
        }
      });

      // END
    } else if (url === "img") {
      // API for new Image
      const db = getDB();

      return (await db).put(imgStore, payload);
      // END
    } else if (url === `img/${payload.id}`) {
      // API for Updating Image
      const db = getDB();

      return (await db).put(imgStore, payload, payload.id);

      // END
    } else if (url === `user/img/${payload.imageId}`) {
      // Update Users Images
      const db = getDB();
      // Returns the updated User with Images
      return (await db)
        .getFromIndex(userStoreName, emailIndex, payload.user)
        .then(async user => {
          user.images = user.images || [];
          user.images.push(payload.imageId);

          (await db).put(userStoreName, user);
          return user;
        });

      // END
    }

    // TODO : Update via User
    // TODO : Update via Admin
  },
  async delete(url) {
    url = url.split("/");
    if (url[0] === `img`) {
      const db = getDB();
      return (await db).delete(imgStore, parseInt(url[1]));
    }
  },
  logout() {
    localStorage.clear();
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
    return JSON.parse(localStorage.getItem(login));
  },
  isAdmin() {
    return JSON.parse(localStorage.getItem(admin));
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
