import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const fetchCollection = (name) => {
  try {
    return getDocs(query(collection(db, name), orderBy("order", "asc")))
      .then((snap) => snap.docs.map((doc) => ({ ...doc.data(), id: doc.data().id ?? doc.id })))
      .catch(() => []);
  } catch {
    return Promise.resolve([]);
  }
};

export const projectsPromise = fetchCollection("projects");
export const blogsPromise = fetchCollection("blogs");
