import React from "react";
import { useEffect, useState, FormEvent } from "react";

type QuestionBubbleProps = {
  question: string;
};

function QuestionBubble({ question }: QuestionBubbleProps) {
  return (
    <div className="right-8">
      <span className="text-[#00FF00]">Me:</span>
      <br />
      <div className="bg-slate-400 text-sm mt-2 py-4 px-4 rounded-xl no-underline inline-block">
        {question}
      </div>
    </div>
  );
}

type AnswerBubbleProps = {
  answer: string;
};

function AnswerBubble({ answer }: AnswerBubbleProps) {
  return (
    <div>
      <span className="relative text-[#ff0000]">J.A.R.V.I.S:</span>
      <br />
      <div className="bg-slate-400 text-sm mt-2 py-4 px-4 rounded-xl no-underline inline-block">
        {answer}
      </div>
    </div>
  );
}

type QnA = {
  question: string;
  answer: string;
};

function App() {
  const [question, setQuestion] = useState("");
  const [, setAnswer] = useState("");
  const [prevAnswers, setPrevAnswers] = useState<QnA[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
    };
    setQuestion(target.question.value);
    target.question.value = "";
  };

  useEffect(() => {
    const getMessage = async () => {
      const response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
      const data = await response.json();
      setAnswer(data.answers);
      setPrevAnswers((prev) => [...prev, { question, answer: data.answers }]);
    };
    question !== "" && getMessage();
    setQuestion("");
  }, [question]);

  return (
    <>
      <div className="flex bg-slate-800 flex-col items-center justify-center min-h-screen py-2">
        <div className="text-white text-5xl font-extrabold underline ">
          J.A.R.V.I.S
        </div>
        <header className="flex flex-col items-center justify-center text-1xl w-[100%] mt-8">
          <p className="text-white p-8 overflow-scroll bg-gray-900  min-h-fit h-80 w-3/4  rounded-sm">
            {prevAnswers.map((prevAnswer, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                <div className="mb-5 float-right">
                  <QuestionBubble question={prevAnswer.question} />
                </div>
                <div className="mt-24">
                  <AnswerBubble answer={prevAnswer.answer} />
                </div>
              </React.Fragment>
            ))}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className=" border rounded-md shadow-lg h-[40px] mt-16 mb-8 w-[320px] "
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
