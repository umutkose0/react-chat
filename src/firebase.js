import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile, signOut  } from "firebase/auth";
import { getStorage, ref,uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { getFirestore,doc, setDoc } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);

export const createUser=async(displayName,email,password,photo)=>{
 try{
    const r=await createUserWithEmailAndPassword(auth,email,password);
    const photoUrl=await uploadImage(photo,email);
    await updateProfile(r.user,{displayName,photoUrl})
    const dbData={
        uid:r.user.uid,
        displayName,
        email,
        photoUrl
    };
    console.log(dbData);
    await setDoc(doc(db,"users",r.user.uid),dbData)
    await setDoc(doc(db,"userChats",r.user.uid),{})
    return true;
 }
 catch(e)
 {
    console.log(e.message);
    return false;
 }
}
export const uploadImage=async(file,displayName)=>{
    const fileRef=ref(storage,displayName);
    const metadata={
        contentType:'image/jpeg'
    }
    const uploadTask =uploadBytesResumable(fileRef, file, metadata)
    const res=await uploadTask
    const url=await getDownloadURL(res.ref)
    console.log(url)
    return url? url:"";
    /*
    uploadTask.on('state_changed',
    (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
    },
    (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log("permission error");
            break;
          case 'storage/canceled':
            console.log("user  canceled");
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log("server error");
            default:
                console.log("an error occured when uploading photo.");
            break;
        }
      },
      async()=>{
        const downloadURL=await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL);
         return downloadURL;
      })
    */
}
export const signIn=async(email,password)=>{
    try{
      const credential=await signInWithEmailAndPassword(auth, email, password)
      const user= credential.user;
      console.log("logged in",user);
      return true;
    }
    catch(e)
    {
      console.log(e.message);
      return false;
    }


}
export const logOut=async()=>{
  try{
    await signOut(auth)
    console.log("logged out");
    return true;
  }
  catch(e)
  {
    console.log(e.message)
    return false;
  }
}