import './style.css'
import { initializeGame } from './gameLogic'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas style="border: 1px solid black; background: white" height="600" width="600" id="canvas"></canvas>
  </div>
`

initializeGame()
