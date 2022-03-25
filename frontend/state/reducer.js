// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import * as types from "./action-types";
//Wheel
const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case types.MOVE_CLOCKWISE:
      if (state == 5) {
        return (state = 0);
      } else return state + 1;
    case types.MOVE_COUNTERCLOCKWISE:
      if (state == 0) {
        return (state = 5);
      } else return state - 1;
    default:
      return state;
  }
}
//Quiz
const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case types.RESET_FORM:
      return state;
    case types.SET_QUIZ_INTO_STATE:
      return action.payload
    //Working
    // case types.SET_QUIZ_INTO_STATE:
    //   if (action.payload) {
    //     return { ...action.payload };
    //   } else return initialQuizState;
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.payload) {
    case types.SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
//Form
const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
function form(state = initialFormState, action) {
  switch (action.type) {
    case types.INPUT_CHANGE:
      return action.payload;
      // return {...state, ...action.payload}
    case types.RESET_FORM:
      return { ...initialFormState };
      // return initialFormState;
      // return {...state, initialFormState}
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});



//Problems
//Quiz
//15 i should select bottom answer nav to form and 
//back and it should be same quiz

//13 findByText('Congrats: "foobarbaz?" is a great question!', queryOptions, waitForOptions)


//11passing
//5,8,9,12,13

//8passing
//8,9,10,11,12,13,15

//8,9,12,13

//Quiz 
//#8 - success message at top of the screen

// #9 - failure message at top of the screen

//#12 - successful submit message at top of the screen

// #13 - successful submit message a top of the screen 

// quiz shouldn't reload when leaving the page.
