import Stack from "./class/Stack";
import { operators } from "./constants/operators";
import { functions } from "./constants/functions";
import { regex } from "./constants/regex";


export default function evaluate() {
  // output html element
  const outputString = document.querySelector('#outputString')! as HTMLElement

  // get postfix
  const postfixString = document.querySelector('#postfixString')! as HTMLElement

  // tokenize postfix
  const postfix: string[] = postfixString.innerHTML.match(regex)! as string[]
  const stack = new Stack<string>()

  for (let i = 0; i < postfix.length; i++) {
    const token: string = postfix[i]
    
    if (token === 'π') {
      let answer = Math.PI
      stack.push(`${answer}`)
    } else if (!isNaN(Number(token))) {
      stack.push(token)
      console.log(token)
    } else if (operators.indexOf(token) !== -1) {
      let a: number = Number(stack.pop())
      let b: number = Number(stack.pop())
      let answer: number = 0
      switch (token) {
        case '+':
          answer = b + a
          break
        case '-':
          answer = b - a
          break
        case '/':
          answer = b / a
          break
        case '*':
          answer = b * a
          break
        case '^':
          answer = b ** a
      }
      stack.push(`${answer}`)
      console.log(answer)
    } else if (functions.indexOf(token) !== -1) {
      let a: number
      let answer: number = 0

      // conversion
      if (['sin', 'cos', 'tan'].indexOf(token) !== -1) {
        a = convertToRadian(Number(stack.pop()))
      } else {
        a =  Number(stack.pop())
      }

      switch(token) {
        case 'sin':
          answer = Math.sin(a)
          break
        case 'cos':
          answer = Math.cos(a)
          break
        case 'tan':
          answer = Math.tan(a)
          break
        case 'log':
          answer = Math.log10(a)
          break
        case 'arcsin':
          answer = Math.asin(a)
          break
        case 'arccos':
          answer = Math.acos(a)
          break
        case 'arctan':
          answer = Math.atan(a)
          break
        case 'ln':
          answer = Math.log(a)
          break
        case 'sqrt':
          answer = Math.sqrt(a)
          break
        case 'cbrt':
          answer = Math.cbrt(a)
      }
      
      if (['arcsin', 'arccos',
      'arctan'].indexOf(token) !== -1) {
        answer = convertToDegree(answer)
      }

      console.log(answer)
      stack.push(`${answer}`)
    }

    outputString.innerHTML = stack.peek()
    console.log(stack)

  }
}

function convertToDegree(radian: number){
  return radian * 180 / Math.PI
}

function convertToRadian(degree: number){
  return degree * Math.PI / 180
}
