import styles from './contact.module.css'

export default function Page({ }) {
    return (
        <main className={styles.contactMain}>
            <div className={styles.contact}>
                <h1>Contact Me</h1>
            </div>
            <div className="contactForms">
                <form action="">
                    <input required='true' placeholder='Name' type="text" className={styles.contactForm} />
                    <input required='true' placeholder="Subject" type="text" className={styles.contactForm} />
                    <input required='true' placeholder='Email' type="text" className={styles.contactForm} />
                    <button type="submit" className={styles.contactFormButton}>Continue</button>
                </form>
            </div>
        </main>
    )
}