import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Quiz(props) {
  const { quiz, postAnswer } = props;

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const onClick = (id) => {
    props.selectAnswer(id);
  };

  //submit button
  const handleSubmit = (evt) => {
    evt.preventDefault();
    postAnswer({quiz_id: props.quiz.quiz_id, answer_id: props.selectedAnswer})
  }

  console.log(quiz);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`${props.selectedAnswer === quiz.answers[0].answer_id
                    ? "answer selected"
                    : "answer"
                }`}
              >
                {quiz.answers[0].text}
                <button onClick={() => onClick(quiz.answers[0].answer_id)}>
                  {props.selectedAnswer === quiz.answers[0].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
              <div
                className={`${props.selectedAnswer === quiz.answers[1].answer_id
                    ? "answer selected"
                    : "answer"
                }`}
              >
                {quiz.answers[1].text}
                <button onClick={() => onClick(quiz.answers[1].answer_id)}>
                  {props.selectedAnswer === quiz.answers[1].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!props.selectedAnswer} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

export default connect((state) => state, actionCreators)(Quiz);
