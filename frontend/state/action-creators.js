// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import * as types from "./action-types";

export function moveClockwise(value) {
  return { type: types.MOVE_CLOCKWISE, payload: value };
}

export function moveCounterClockwise(value) {
  return { type: types.MOVE_COUNTERCLOCKWISE, payload: value };
}

export function selectAnswer(answer_id) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id };
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(question) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: question };
}

export function inputChange(value) {
  return {type: types.INPUT_CHANGE, payload: value}
}

export function resetForm() {
  return { type: types.RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    //?
    dispatch(resetForm())
    //?
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}

//{ quiz_id, answer_id }
export function postAnswer(answer) {
  return function (dispatch) {
    dispatch(resetForm())
    axios
      .post(`http://localhost:9000/api/quiz/answer`, answer)
      .then((res) => {
        console.log(res.data.message);
        // dispatch(selectAnswer(null));
        // dispatch(setQuiz(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}

//Form
export function postQuiz({
  question_text,
  true_answer_text,
  false_answer_text,
}) {
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/new`, {
      question_text,
      true_answer_text,
      false_answer_text,
    })
    .then(res => {
      console.log(res)
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
