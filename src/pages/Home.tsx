import '../styles/Home.css'

function Home(): JSX.Element {
  return (
    <div className="home">
      <h1>Build your own local tool</h1>
      <p className="subtitle">
        A blank foundation for any small app you wish existed — it runs entirely in your browser,
        your data never leaves your machine, and it ships as a single file you can just open.
      </p>

      <section className="intro">
        <h2>How this works</h2>
        <p>
          You don't write the code — you describe the tool you want, and the coding agent builds it
          with you. The fastest way to start is to kick off the design interview with the{' '}
          <code>/grill-me</code> skill: it grills you on what you actually need, turns that into a
          spec and a set of issues, then builds them test-first and shows you the running result.
          Then you ask for the next thing.
        </p>
      </section>

      <section className="features">
        <h2>Try starting with something like…</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📊 Explore data</h3>
            <p className="prompt">"/grill-me I want to drop in a CSV and filter, sort, and chart any column."</p>
          </div>
          <div className="feature-card">
            <h3>💸 Track money</h3>
            <p className="prompt">"/grill-me a budget tool that imports my bank export and shows spend by month."</p>
          </div>
          <div className="feature-card">
            <h3>✅ Build a habit</h3>
            <p className="prompt">"/grill-me a habit tracker with a streak calendar I tick off each day."</p>
          </div>
          <div className="feature-card">
            <h3>📝 Capture notes</h3>
            <p className="prompt">"/grill-me a markdown scratchpad with live preview that autosaves locally."</p>
          </div>
          <div className="feature-card">
            <h3>🔁 Convert formats</h3>
            <p className="prompt">"/grill-me a JSON ↔ YAML converter that validates as I type."</p>
          </div>
          <div className="feature-card">
            <h3>🏋️ Log progress</h3>
            <p className="prompt">"/grill-me a workout log where I record sets and see progress over time."</p>
          </div>
        </div>
        <p className="hint">
          Don't have it fully figured out? That's what the interview is for. Start with{' '}
          <code>/grill-me</code> and a rough idea — the agent sharpens the rest.
        </p>
      </section>
    </div>
  )
}

export default Home
