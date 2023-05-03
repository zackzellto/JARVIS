import { useEffect, useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setQuestion(e.target.question.value);
    e.target.question.value = "";
  };

  useEffect(() => {
    const getMessage = async () => {
      const response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
      const data = await response.json();
      setAnswer(data.answers);
      setPrevAnswer((previous) => previous + "\n" + answer);
    };
    question !== "" && getMessage();
    setQuestion("");
  }, [answer, question]);

  return (
    <>
      <div className="flex bg-slate-800 p-8 flex-col items-center justify-center min-h-screen py-2">
        <div className="text-white text-[48px] font-extrabold text-lg underline ">
          J.A.R.V.I.S
        </div>
        <header className="flex flex-col items-center justify-center text-1xl mt-8">
          <p className="text-white p-8 overflow-scroll bg-gray-900 h-[550px] w-80 rounded-xl">
            <div className="text-sm  bg-slate-400">{prevAnswer}</div> <br />{" "}
            <div className="bg-slate-400 no-underline">{answer}</div>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className=" border rounded-md shadow-lg h-[40px] mt-24 mb-8 w-[320px] "
              name="question"
              placeholder="Ask a question"
              id="question"
              type="text"
            />
            <br />
            <button
              className="border h-[40px] shadow-lg rounded-md bg-slate-500 text-white w-[320px]"
              type="submit"
            >
              Ask
            </button>
          </form>
        </header>
      </div>
    </>
  );
}

export default App;
