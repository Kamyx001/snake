import './style.css'
import { initializeGame } from './gameLogic'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Snake</h1>
  <div id="scoreboard"></div>
  <canvas height="600" width="600" id="canvas"></canvas>
  <button id="restart">Restart</button>
`

initializeGame()

