import './style.css'
import { initializeGame } from './gameLogic'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas style="border: 1px solid black; background: white" height="1000" width="1000" id="canvas"></canvas>
  </div>
`

initializeGame()
