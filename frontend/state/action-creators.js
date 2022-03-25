// ❗ You don't need to add extra action creators to achieve MVP

//import action creators:
import { 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from "./action-types"
import axios from "axios"

export function moveClockwise(value) { 
  return { type: MOVE_CLOCKWISE, payload: value }
}

export function moveCounterClockwise(value) { 
  return { type: MOVE_COUNTERCLOCKWISE, payload: value }
}

export function selectAnswer(answerId) { 
  return { type: SET_SELECTED_ANSWER, payload: answerId }
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) { 
  return { type: SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange({ id, value }) {
  return { type: INPUT_CHANGE, payload: { id, value }}
}

export function resetForm() { 
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null))
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.error(err)
        dispatch(setMessage(err.message))
      })
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    axios.post(`http://localhost:9000/api/quiz/answer`, { quiz_id, answer_id })
      .then(res => {
        // - Dispatch an action to reset the selected answer state
        dispatch(selectAnswer(null))
        // - Dispatch an action to set the server message to state
        dispatch(setMessage(res.data.message))
        // - Dispatch the fetching of the next quiz
        dispatch(fetchQuiz())
      })
      .catch(err => {
        console.error(err)
        dispatch(setMessage(err.message))
      })
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    const payload = { 
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
     }
    axios.post(`http://localhost:9000/api/quiz/new`, payload)
    // On successful POST:
    .then(response => {
      // - Dispatch the correct message to the the appropriate state
      dispatch(setMessage(`Congrats: "${response.data.question}" is a great question!`))
      // - Dispatch the resetting of the form
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
      dispatch(setMessage(err.message))
    })
    
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state