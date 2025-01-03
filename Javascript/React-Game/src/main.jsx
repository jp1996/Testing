import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'jotai'
import ReactUI from './ReactUI.jsx'
import './index.css'
import initGame from './initGame.js'
import { store } from './store.js'

const ui = document.getElementById('ui');

//watches parentElement of ui, and resizes ui based off width and height ratio between page and ui box
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight,
    )
  )
}).observe(ui.parentElement);

createRoot(ui).render(
  <StrictMode>
    <Provider store = {store}>
      <ReactUI />
    </Provider>
  </StrictMode>,
)

initGame();
