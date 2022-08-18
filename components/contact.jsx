import styles from './contact.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from '../lib/context';
import { useContext } from 'react';

export default function Page({ }) {

    const router = useRouter()
    const { user, username } = useContext(UserContext);

    const [email, setEmail] = useState(user && user.email);
    useEffect(() => {
        setEmail(user && user.email)
    }, [user]);

    const handleClick = (e) => {
        e.preventDefault()

        if(!e.target.name.value && !e.target.subject.value && !e.target.email.value){
            return
        }

        router.push({ pathname: `/contact`, query: { name: e.target.name.value, subject: e.target.subject.value, email: e.target.email.value}})
        
        return
    }

    return (
        <main className={styles.contactMain}>
            <div className={styles.contact}>
                <h1>Contact Me</h1>
            </div>
            <div className="contactForms">
                <form onSubmit={handleClick}>
                    <input name="name" required={true} placeholder='Name' type="text" className={styles.contactForm} />
                    <input name="subject" required={true} placeholder="Subject" type="text" className={styles.contactForm} />
                    <input onChange={(e) => setEmail(e.target.value)} value={email ? email: ""} name="email" required={true} placeholder='Email' type="text" className={styles.contactForm} />
                    <button type="submit" className={styles.contactFormButton}>Continue</button>
                </form>
            </div>
        </main>
    )
}