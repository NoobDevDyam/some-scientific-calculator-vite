import Stack from './class/Stack'
import { operators } from './constants/operators'
import { functions } from './constants/functions'

import InfixTokenizer from '@psse-cpu/tokenizer'


export default function parse() {
  // read user input
  const inputString = document.querySelector('#inputString')! as HTMLElement
  // postfix output element
  const postfixString = document.querySelector('#postfixString')! as HTMLElement

  // output queue
  let queue: string = ''
  const infix = inputString.innerHTML // set input as infix

  const tokenizer = new InfixTokenizer(infix, ['π', 'log', 'sin', 'cos', 'tan', 
                                        'arcsin', 'arccos',
                                        'arctan', 'ln', 'sqrt', 'cbrt'])

  // operator stack
  const stack = new Stack<string>()

  // Shunting yard Algo
  while (tokenizer.hasMoreTokens()) {
    const token: string = tokenizer.readToken()! as string

    let topStack: string = stack.peek()

    console.log(token)
    if (!isNaN(Number(token)) || token === 'π') {
      queue += token + " "

      // for debug
      console.log('is a number')
    } else if (functions.indexOf(token) !== -1) {
      // push token to stack
      stack.push(token)

      //for debug
      console.log('is a function')
    } else if (operators.indexOf(token) !== -1) {
      // peek top of operator stack
      let topStack: string = stack.peek()

      // find o2 precedence 
      const topPrecedence = checkPrecedence(topStack)
      // find o1 precedence
      const tokenPrecedence = checkPrecedence(token)
      // find o1 associativity
      const tokenAssociativity = checkAssociativity(token)

      if (!stack.isEmpty()) {
        if (operators.indexOf(topStack) !== -1 &&
          topPrecedence > tokenPrecedence || topPrecedence === tokenPrecedence &&
          tokenAssociativity === 'left'
        ) {
          if (topStack !== '(') {
            queue += stack.pop() + " "
            topStack = stack.peek()
          }
        }
      }

      // push token to stack
      stack.push(token)

      // for debugging
      console.log('is operator')
    } else if (token === '(') {
      stack.push(token)

      // for debug
      console.log('is l-parenthesis')
    } else if (token === ')') {
      while(topStack !== '(') {
        if (!stack.isEmpty()) {
          // add to output queue
          queue += stack.pop() + " "
          if (functions.indexOf(topStack)!==-1) {
            queue += stack.pop() + " "
          }
        }
        topStack = stack.peek()
      }
      // stack.pop()
      // for debug
      console.log('is r-parenthesis')
    }
  }

  while (!stack.isEmpty()) {
    const topStack = stack.peek()
    if (topStack === '(') {
      stack.pop()
    } else {
      queue += stack.pop() + " "
    }
  }

  // output to screen
  postfixString.innerHTML = queue

  // for debug
  console.log(stack)
}

// operator dictionary
const operatorDictionary: any[] = [
  {operator: '+',
  precedence: 2,
  associativity: 'left'
  },
  {operator: '-',
  precedence: 2,
  associativity: 'left'
  },
  {operator: '/',
  precedence: 3,
  associativity: 'left'
  },
  {operator: '*',
  precedence: 3,
  associativity: 'left'
  },
  {operator: '^',
  precedence: 4,
  associativity: 'right'
  },
]

function checkPrecedence(operator: string) {
  // loop through array of operators
  let precedence = 0
  for (let i = 0; i < operatorDictionary.length; i++) {
    if(operatorDictionary[i].operator === operator){
      precedence = operatorDictionary[i].precedence
    }
  }
  return precedence
}

function checkAssociativity(operator: string) {
  // loop through array of operators
  let associativity = ''
  for (let i = 0; i < operatorDictionary.length; i++) {
    if(operatorDictionary[i].operator === operator){
      associativity = operatorDictionary[i].associativity
    }
  }
  return associativity
}