import React from 'react'
import ReactDOM from 'react-dom'

function Box() {
  return (
    <div
      sx={{
        bg: '--background',
        color: '--text',
      }}
    >
      Hi
    </div>
  )
}

function App() {
  return <Box />
}

ReactDOM.render(<App />, document.getElementById('root'))
