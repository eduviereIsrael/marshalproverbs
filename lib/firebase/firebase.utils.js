import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  arrayUnion,
  updateDoc
} from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAG1ew8X82DV6U7yT-8l6SVOfhkSjP8JYg",
//   authDomain: "marshalproverbs.firebaseapp.com",
//   projectId: "marshalproverbs",
//   storageBucket: "marshalproverbs.appspot.com",
//   messagingSenderId: "152386387464",
//   appId: "1:152386387464:web:dcfd52996076e969439bbd"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCx8wa2qqjdV9nNBLvtlDK9WOGMu_odRuc",
  authDomain: "mawshalproverbs.firebaseapp.com",
  projectId: "mawshalproverbs",
  storageBucket: "mawshalproverbs.appspot.com",
  messagingSenderId: "749198366565",
  appId: "1:749198366565:web:7a59475a6ec05ccde9f38c"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
// export const signInWithGooglePopup = () =>
//   signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore();




export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // console.log(additionalInformation)
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });

      return {
        email,
        createdAt,
        ...additionalInformation,
        id: userAuth.uid
      }
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  } else{
    return {...userSnapshot.data(), id: userAuth.uid}
  }

  // console.log (userSnapshot.data());
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
    // console.log('we got here, firebase', email, password)
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

 
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth) 
      },
      reject
    )
  })
}

export const updateUserProduct = async (userId, category, productId) => {
  const validCategories = ['poems', 'haikuWallpapers', 'books'];
  
  if (!validCategories.includes(category)) {
      throw new Error(`Invalid category: ${category}. Valid categories are ${validCategories.join(', ')}`);
  }

  try {
      const userRef = doc(db, 'users', userId);
      
      // Update the specific category array by adding the product ID to it and update the timestamp
      await updateDoc(userRef, {
          [`purchases.${category}`]: arrayUnion(productId),
      });

      return "success";
  } catch (error) {
      console.error("Error updating user document: ", error);
  }
};


export const updateUserSubscription = async (userId, plan, id, email_token, subCode) => {


  try {
      const userRef = doc(db, 'users', userId);
      
      // Update the specific category array by adding the product ID to it and update the timestamp
      await updateDoc(userRef, {
        'sub.plan': plan,
        'sub.id': id,
        'sub.email_token': email_token,
        'sub.subCode': subCode,
      });

      return "success";
  } catch (error) {
      console.error("Error updating user document: ", error);
  }
};
