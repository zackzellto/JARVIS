import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setQuestion(e.target.question.value);
  };

  useEffect(() => {
    const getMessage = async () => {
      const response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
      const data = await response.json();
      setAnswer(data.answers);
      setPrevAnswer((previous) => previous + answer + "\n");
    };
    question !== "" && getMessage();
    setQuestion("");
  }, [question]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <header className="flex flex-col items-center justify-center text-1xl">
          <p>
            {prevAnswer} <br /> {answer}
          </p>
          <form onSubmit={handleSubmit}>
            <input className=" border " name="question" type="text" />
            <input
              className="border text-white text-3xl bg-slate-500"
              value="Ask"
              type="submit"
            />
          </form>
        </header>
      </div>
    </>
  );
}

export default App;
