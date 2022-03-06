import './style.css'
import parse from './parse'
import evaluate from './evaluate'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<div class="calculator">
  <div class="screen">
    <p class="input" id="inputString"></p>
    <p class="postfix" id="postfixString"></p>
    <p class="output" id="outputString"></p>
  </div>
  <div class="body">
    <div class="row">
      <button class="neon-button" id="karat">^</button>
      <button class="neon-button" id="log">log</button>
      <button class="neon-button" id="sin">sin</button>
      <button class="neon-button" id="cos">cos</button>
      <button class="neon-button" id="tan">tan</button>
    </div>
    <div class="row">
      <button class="neon-button" id="arcsin">sin⁻¹</button>
      <button class="neon-button" id="arccos">cos⁻¹</button>
      <button class="neon-button" id="arctan">tan⁻¹</button>
      <button class="neon-button" id="sqrt">sqrt</button>
    </div>
    <div class="row">
      <button class="neon-button" id="seven">7</button>
      <button class="neon-button" id="eight">8</button>
      <button class="neon-button" id="nine">9</button>
      <button class="neon-button" id="del">DEL</button>
      <button class="neon-button" id="clear">AC</button>
    </div>
    <div class="row">
      <button class="neon-button" id="four">4</button>
      <button class="neon-button" id="five">5</button>
      <button class="neon-button" id="six">6</button>
      <button class="neon-button" id="times">*</button>
      <button class="neon-button" id="divide">/</button>
      <button class="neon-button" id="pi">π</button>
    </div>
    <div class="row">
      <button class="neon-button" id="one">1</button>
      <button class="neon-button" id="two">2</button>
      <button class="neon-button" id="three">3</button>
      <button class="neon-button" id="add">+</button>
      <button class="neon-button" id="minus">-</button>
      <button class="neon-button" id="ln">ln</button>
    </div>
    <div class="row">
      <button class="neon-button" id="zero">0</button>
      <button class="neon-button" id="period">.</button>
      <button class="neon-button" id="leftp">(</button>
      <button class="neon-button" id="rightp">)</button>
      <button class="neon-button" id="cbrt">cbrt</button>
      <button class="neon-button" id="calculate">=</button>
    </div>
  </div>
</div>
`

//buttons
const karatBtn = document.querySelector('#karat')! as HTMLInputElement
const logBtn = document.querySelector('#log')! as HTMLInputElement
const sinBtn = document.querySelector('#sin')! as HTMLInputElement
const cosBtn = document.querySelector('#cos')! as HTMLInputElement
const tanBtn = document.querySelector('#tan')! as HTMLInputElement

const arcsinBtn = document.querySelector('#arcsin')! as HTMLInputElement
const arccosBtn = document.querySelector('#arccos')! as HTMLInputElement
const arctanBtn = document.querySelector('#arctan')! as HTMLInputElement
const sqrtBtn = document.querySelector('#sqrt')! as HTMLInputElement

const number7Btn = document.querySelector('#seven')! as HTMLInputElement
const number8Btn = document.querySelector('#eight')! as HTMLInputElement
const number9Btn = document.querySelector('#nine')! as HTMLInputElement
const delBtn = document.querySelector('#del')! as HTMLInputElement
const clearBtn = document.querySelector('#clear')! as HTMLInputElement

const number4Btn = document.querySelector('#four')! as HTMLInputElement
const number5Btn = document.querySelector('#five')! as HTMLInputElement
const number6Btn = document.querySelector('#six')! as HTMLInputElement
const multiplicationBtn = document.querySelector('#times')! as HTMLInputElement
const divisionBtn = document.querySelector('#divide')! as HTMLInputElement
const piBtn = document.querySelector('#pi')! as HTMLInputElement

const number1Btn = document.querySelector('#one')! as HTMLInputElement
const number2Btn = document.querySelector('#two')! as HTMLInputElement
const number3Btn = document.querySelector('#three')! as HTMLInputElement
const addBtn = document.querySelector('#add')! as HTMLInputElement
const minusBtn = document.querySelector('#minus')! as HTMLInputElement
const lnBtn = document.querySelector('#ln')! as HTMLInputElement

const number0Btn = document.querySelector('#zero')! as HTMLInputElement
const periodBtn = document.querySelector('#period')! as HTMLInputElement
const leftParenthesisBtn = document.querySelector('#leftp')! as HTMLInputElement
const rightParenthesisBtn = document.querySelector('#rightp')! as HTMLInputElement
const cbrtBtn = document.querySelector('#cbrt')! as HTMLInputElement
const calculateBtn = document.querySelector('#calculate')! as HTMLInputElement

karatBtn.onclick = function() {
  addText(' ^ ')
}
logBtn.onclick = function() {
  addText(' log( ')
}
sinBtn.onclick = function() {
  addText(' sin( ')
}
cosBtn.onclick = function() {
  addText(' cos( ')
}
tanBtn.onclick = function() {
  addText(' tan( ')
}

sqrtBtn.onclick = function() {
  addText(' sqrt( ')
}
arcsinBtn.onclick = function() {
  addText(' arcsin( ')
}
arccosBtn.onclick = function() {
  addText(' arccos( ')
}
arctanBtn.onclick = function() {
  addText(' arctan( ')
}

number7Btn.onclick = function() {
  addText('7')
}
number8Btn.onclick = function() {
  addText('8')
}
number9Btn.onclick = function() {
  addText('9')
}
delBtn.onclick = function() {
  removeText()
}
clearBtn.onclick = function() {
  clearText()
}

number4Btn.onclick = function() {
  addText('4')
}
number5Btn.onclick = function() {
  addText('5')
}
number6Btn.onclick = function() {
  addText('6')
}
multiplicationBtn.onclick = function() {
  addText(' * ')
}
divisionBtn.onclick = function() {
  addText(' / ')
}
piBtn.onclick = function() {
  addText(' π ')
}

number1Btn.onclick = function() {
  addText('1')
}
number2Btn.onclick = function() {
  addText('2')
}
number3Btn.onclick = function() {
  addText('3')
}
addBtn.onclick = function() {
  addText(' + ')
}
minusBtn.onclick = function() {
  addText(' - ')
}
lnBtn.onclick = function() {
  addText(' ln( ')
}

number0Btn.onclick = function() {
  addText('0')
}
periodBtn.onclick = function() {
  addText('.')
}
leftParenthesisBtn.onclick = function() {
  addText(' ( ')
}
rightParenthesisBtn.onclick = function() {
  addText(' ) ')
}
cbrtBtn.onclick = function() {
  addText(' cbrt ')
}
calculateBtn.onclick = function() {
  calculate()
}

function clearText() {
  const inputString = document.querySelector('#inputString')! as HTMLElement
  const outputString = document.querySelector('#outputString')! as HTMLElement
  const postfixString = document.querySelector('#postfixString')! as HTMLElement
  inputString.innerHTML = ''
  outputString.innerHTML = ''
  postfixString.innerHTML = ''
}
function removeText() {
  const inputString = document.querySelector('#inputString')! as HTMLElement
  const input = inputString.innerHTML
  inputString.innerHTML = input.substring(0, input.length - 1)
}
function addText(text: string) {
  const inputString = document.querySelector('#inputString')! as HTMLElement
  inputString.innerHTML += text
}

function calculate() {
  parse()
  evaluate()
}
