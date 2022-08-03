

export default function knowledge(theKnowledge) {
  theKnowledge = theKnowledge.theKnowledge;
  const code = JSON.parse(theKnowledge.body).element
  return (
    <main className='knowlagePortfolioItem'>
      <a className='knowagePortfolioTitle' href={theKnowledge.url}>{theKnowledge.title}</a>
      <div className="codeSnippitContainer">
        <div className='codeSnippit' dangerouslySetInnerHTML={{ __html: code }} />

      </div>

    </main>
  )
}
