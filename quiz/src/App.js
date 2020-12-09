import React from "react";
import { useGlobalContext } from "./Context";
import Loading from "./Loading";
import Modal from "./Modal";
import Quiz from "./Quiz";
import SearchForm from "./SearchForm";

function App() {
  const { isModalOpen, isWaiting, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Loading />;
  }
  if (isWaiting) {
    return <SearchForm />;
  }
  if (isModalOpen) {
    return <Modal />;
  }
  return <Quiz />;
}

export default App;
