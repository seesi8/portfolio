
import { collection, addDoc, setDoc, doc, getDocs, deleteDoc, query, orderBy, limit } from "firebase/firestore";
import { firestore, firebase, serverTimestamp } from '../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export default async function dbHandler(req, res) {
  const query = req.query;
  const { value, domain, password } = query;
  if (password.slice(1) / password.charAt(0) == 940358) {
    const docRef = await setDoc(doc(firestore, "knowledge", uuidv4()), {

      ...query
    });
    res.status(200).json({ status: true })
  }
  else{
    res.status(200).json({ status: false })
  }
}
