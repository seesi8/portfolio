import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import styles from '../components/signin.module.css'
import { writeBatch } from "firebase/firestore";
import { useRouter } from 'next/router'
import Head from 'next/head'
export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main className={styles.container}>
      <Head>
        <title>Sign-In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <div className={styles.googleSignInContainer}>
      <h1 className={styles.signIn}>Sign In</h1>
      <button className={styles.googleSignIn} onClick={signInWithGoogle}>
        <img src={'/google.png'} className={styles.googleSignInLogo} />
        <h4 className={styles.googleSignInText}>Sign in with Google</h4>
      </button>
    </div>

  );
}

// Sign out button
function SignOutButton() {
  return (
    <button className={styles.googleSignOut} onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const OnSubmit = async (e) => {
    e.preventDefault();
    const router = useRouter()
    // Create refs for both documents
    const userDoc = doc(firestore, 'users', `${user.uid}`);
    const usernameDoc = doc(firestore, 'usernames', `${formValue}`);

    // Commit both docs together as a batch write.
    const batch = writeBatch(firestore);
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName, email: user.email, emailTime: "5/29/2013" });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
    router.push(`/`)
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(firestore, 'usernames', `${username}`);
        const docSnap = await getDoc(ref)
        const exists = docSnap.data();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3 className={styles.title}>Choose Username</h3>
        <form onSubmit={OnSubmit} className={styles.usernameForm}>
          <input className={styles.usernameInput} name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <button className={styles.choose} type="submit" disabled={!isValid}>
            Choose
          </button>

        </form>
      </section>
    )
  );
}
