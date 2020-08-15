// import Vue from "../main";

// Database to Store Users and Images
const createDataBaseLocal = () => {
  return new Promise((resolve, reject) => {
    let db;
    const DBOpenRequest = window.indexedDB.open("mrcashback", 1);
    // Opening Database at Version 1

    // Creating Object Stores
    DBOpenRequest.onupgradeneeded = function(e) {
      db = DBOpenRequest.result;
      db.createObjectStore("images", { autoIncrement: true });
      db.createObjectStore("users", { autoIncrement: true });
    };
    DBOpenRequest.onsuccess = function(event) {
      // store the req of opening the database in the db variable.
      db = DBOpenRequest.result;
      // Resolving Database after Object Store Creation
      // This db will be used for CRUD Operations.
      resolve(db);
    };
  });
};
const addAdmin = db => {
  const transaction = db.transaction("users", "readwrite");
  const oS = transaction.objectStore("users");
  transaction.onsuccess = function(e) {
    console.log(e);
  };
  oS.getAll()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  oS.add({
    email: "admin@mrcashback",
    password: "!Mrcashback123",
    token: "",
    verified: true,
    admin: true
  });
};
const db = (async () => {
  const db = await createDataBaseLocal();
  addAdmin(db);
  return db;
})();

export const client = {
  get(url) {
    if (url === "user/me") {
    }
  },
  post(url, payload) {
    if (url === `user/register?signin=${payload.signIn}`) {
      return new Promise((resolve, reject) => {
        console.log(db);
        db.then(res => {
          const users = res
            .transaction(["users"], "readwrite")
            .objectStore("users");
          users.add(payload);
          users.onsuccess = function(e) {
            resolve({ e, payload });
          };
          users.onerror = function(e) {
            reject(e);
          };
        });
      });
    } else if (`user/login`) {
    }
  }
};

export const auth = {
  isLoggedIn() {
    return true;
  },
  isAdmin() {
    return true;
  }
};
