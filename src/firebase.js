import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile, signOut  } from "firebase/auth";
import { getStorage, ref,uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { getFirestore,doc, setDoc , collection, query, where,getDocs, arrayUnion} from "firebase/firestore"; 
import { getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

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
    const photoURL=await uploadImage(photo,email);
    
    await updateProfile(r.user,{displayName,photoURL})

    const dbData={
        uid:r.user.uid,
        displayName,
        email,
        photoURL
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
export const searchUser=async(search)=>{
  try{

      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("email", "==", search));
      const querySnapshot =await getDocs(q);
      return querySnapshot;
  
  }
  catch(e)
  {
    console.log(e.message)
  }

}
export const startChat=async(currentUser,result)=>{
  try{
    const combinedId=currentUser.uid>result.uid
    ?currentUser.uid+result.uid
    :result.uid+currentUser.uid
    const res=await getDoc(doc(db,'chats',combinedId));
    if(!res.exists()){
      await setDoc(doc(db,"chats",combinedId),{messages:[]})
      //start chat with found user
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId+".userInfo"]:{
          uid:result.uid,
          displayName:result.displayName,
          photoURL:result.photoURL
        },
        [combinedId+".date"]:serverTimestamp()
      })
      //start chat with currentUser for found user
      await updateDoc(doc(db,"userChats",result.uid),{
        [combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [combinedId+".date"]:serverTimestamp()
      })
    }
    return true;
  }
  catch(e)
  {
    console.log(e.message)
    return false;
  }
}
export const sendMessage=async(chatId,message)=>{
  try
  {
    await updateDoc(doc(db,"chats",chatId),
    {
      "messages":arrayUnion(message)
    }
    )
    await setLastMessage(chatId,message)

  }catch(e)
  {
    console.log(e.message)
  }
}
export const setLastMessage=async(chatId,message)=>{
  try{
      await updateDoc(doc(db,"userChats",message.uid),{
        [chatId+".lastMessage"]:{"text":message.text}
      })
      await updateDoc(doc(db,"userChats",chatId.replace(message.uid,""),{
        [chatId+".lastMessage"]:{"text":message.text}
      }))   
     
  }
  catch(e)
  {
    console.log(e.message);
  }
}