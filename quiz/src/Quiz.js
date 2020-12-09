import React from "react";
import { useGlobalContext } from "./Context";

const Quiz = () => {
  const { questions, index, correct, nextQuestion } = useGlobalContext();
  const item = questions[index];
  const { question, correct_answer, incorrect_answers } = item;
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  console.log(answers);
  return (
    <main>
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  className="answer-btn"
                  key={index}
                  onClick={() => nextQuestion(answer === correct_answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              );
            })}
          </div>
        </article>
        ;<button className="next-question">next question</button>
      </section>
    </main>
  );
};

export default Quiz;
