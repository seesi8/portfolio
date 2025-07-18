import { auth, firestore } from '../lib/firebase';
import { doc, onSnapshot, toDate } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}


export function useWindowDimensions() {

  /*make sure it is running on client*/
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


  /* make sure that the window size updates*/
  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

export function fixDate(theProjects){

  //force projects to be an array or else it toDate is not a function error
  let projects = []
  projects = projects.concat(theProjects)

  for (let docIndex in projects) {
    if (isNaN(docIndex)) {
      continue
    }
    try{
      projects[docIndex].datemade = (new Date(projects[docIndex].datemade.toDate())).toLocaleDateString()
    }
    catch{
      console.log("datemade error")
    }
  }
  return (projects);
}

export function fixSingleDate(date){


  try{
    date = (new Date(date).toLocaleDateString())
  }
  catch{
    console.log("datemade error")
  }

  return (date);
}
