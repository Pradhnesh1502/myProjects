import { useReducer } from 'react';
import Digitbtn from './Digitbtn';
import OperationBtn from './Operationbtn';
import './Calci.css';

export const ACTIONS ={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


function reducer(state, {type, payload}){
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state
      if(payload.digit === "." && state.currentOperand.includes(".")) return state
      return{
      ...state,
      currentOperand:`${state.currentOperand || ""}${payload.digit}`
     }
     
     case ACTIONS.CLEAR:
      return{}

     case ACTIONS.DELETE_DIGIT:
           if(state.overwrite){
            return{
              ...state,
              overwrite:false,
              currentOperand:null
            }
           }
           if(state.currentOperand==null)return state
           if(state.currentOperand.length===1){
            return{ ...state, currentOperand:null}
           }
           return{
            ...state,
            currentOperand: state.currentOperand.slice(0,-1)
           }
    
      case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null && state.previousOperand==null){
        return state
      }

      if(state.currentOperand==null){
        return{
          ...state,
          operation: payload.operation,
        }
      }
      
      if(state.previousOperand==null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      break
    

      case ACTIONS.EVALUATE:
        if(state.operation == null||
          state.currentOperand==null||
          state.previousOperand==null ){
            return state
          }
          return{
            ...state,
            previousOperand:null,
            operation: null,
            currentOperand:evaluate(state)
          }    
      
  default:
 }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
}
)
function formatOperand(operand){
  if(operand==null) return
  const[integer, decimal]=operand.split('.')
  if(decimal==null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function evaluate({currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev)||isNaN(current)) return ""
  let computation=""
  switch(operation){
    case "+":
      computation=prev+current
      break
    case "-":
      computation=prev-current
      break
    case "*":
      computation=prev*current
      break
    case "÷":
      computation=prev/current
      break
      default:
  }
  return computation.toString()
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch]= useReducer(reducer,{})

  
  return (
    <div className="calci-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand( previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>

      </div>
      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationBtn operation="÷" dispatch={dispatch}/>
      <Digitbtn digit="1" dispatch={dispatch} />
      <Digitbtn digit="2" dispatch={dispatch} />
      <Digitbtn digit="3" dispatch={dispatch} />
      <OperationBtn operation="*" dispatch={dispatch}/>
      <Digitbtn digit="4" dispatch={dispatch} />
      <Digitbtn digit="5" dispatch={dispatch} />
      <Digitbtn digit="6" dispatch={dispatch} />
      <OperationBtn operation="+" dispatch={dispatch}/>
      <Digitbtn digit="7" dispatch={dispatch} />
      <Digitbtn digit="8" dispatch={dispatch} />
      <Digitbtn digit="9" dispatch={dispatch} />
      <OperationBtn operation="-" dispatch={dispatch}/>
      <Digitbtn digit="." dispatch={dispatch} />
      <Digitbtn digit="0" dispatch={dispatch} />

      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.EVALUATE})} >=</button>
    </div>
    
    
  )
}

export default App;
