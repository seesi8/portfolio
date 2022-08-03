import styles from './knowledge.module.css'

export default function knowledge( theKnowledge ) {
  return (
    <main>
        <a href = {theKnowledge.url}>{theKnowledge.title}</a>
        <div dangerouslySetInnerHTML={{__html: theKnowledge.body}} />
    
    </main>
  )
}