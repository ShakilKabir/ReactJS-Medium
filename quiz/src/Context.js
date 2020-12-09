import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quiz";
const AppContext = React.createContext();
const table = {
  sports: 21,
  history: 23,
  politics: 24,
};
export const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  console.log(quiz);
  const tempURL =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
  const url = `https://opentdb.com/api.php?amount=${quiz.amount}&category=${
    table[quiz.category]
  }&difficulty=${quiz.difficulty}&type=multiple`;

  const getQuestions = async (e) => {
    setIsLoading(true);
    // setIsWaiting(false);
    e.preventDefault();
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        setQuestions(response.data.results);
        setIsLoading(false);
        setIsWaiting(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsWaiting(true);
        setIsError(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const nextQuestion = (value) => {
    if (value) {
      setCorrect(correct + 1);
    }
    setIndex((oldIndex) => {
      let newIndex = oldIndex + 1;
      if (newIndex > questions.length - 1) {
        newIndex = 0;
        setIsModalOpen(true);
      }
      return newIndex;
    });
  };
  const playAgain = () => {
    setIsModalOpen(false);
    setIsWaiting(true);
    setCorrect(0);
  };
  const handleSelection = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isWaiting,
        getQuestions,
        isError,
        isLoading,
        questions,
        index,
        correct,
        nextQuestion,
        playAgain,
        quiz,
        handleSelection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
