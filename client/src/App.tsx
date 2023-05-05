import React, { useState, useEffect, FormEvent, useRef } from "react";

type QuestionBubbleProps = {
  question: string;
};

function QuestionBubble({ question }: QuestionBubbleProps) {
  return (
    <div className="right-8">
      <span className="text-blue-600 float-right">Me:</span>
      <br />
      <div className="bg-gray-700 shadow-lg text-sm mt-2 py-4 px-4 rounded-xl no-underline inline-block">
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
      <span className="relative text-rose-400">J.A.R.V.I.S:</span>
      <br />
      <div className="bg-gray-700 shadow-xl text-sm mt-2 py-4 px-4 rounded-xl no-underline inline-block">
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
    };
    const inputQuestion = target.question.value;
    setQuestion(inputQuestion);
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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [prevAnswers]);

  return (
    <>
      <div className="flex bg-slate-800 flex-col bottom-6 items-center justify-center min-h-screen">
        <div className="text-transparent-with-image ">
          <h1 className="font-extrabold md:text-7xl">J.A.R.V.I.S</h1>
          <h5 className="font-bold md:text-1xl text-rose-500 shadow-sm text-center">
            Just A Rather Very Intelligent System
          </h5>
        </div>
        <header className="flex flex-col items-center justify-center text-1xl w-[100%] max-w-[1500px] mt-8">
          <div
            id="chat-window"
            className="text-white rounded-xl shadow-xl p-8 scrollbar-thumb-rose-500 scrollbar-thin overflow-scroll bg-gray-900/90 min-h-fit h-[420px] w-3/4"
            ref={containerRef}
          >
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
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="border p-4 shadow-xl rounded-md h-[50px] mt-8 mb-[16px] w-[350px]"
              name="question"
              placeholder="Ask a question"
              id="question"
              type="text"
            />
            <br />
            <button
              className=" flex items-center justify-center border text-2xl h-[40px] shadow-lg rounded-md bg-rose-500 text-white w-[350px]"
              type="submit"
            >
              Send
            </button>
          </form>
        </header>
        <div className="h-[2px] w-[90%] mt-12 bg-white"></div>
        <footer className="flex flex-col items-center justify-center text-1xl w-[100%] max-w-[1500px] mt-8">
          <div className="text-white">
            <h1 className="font-bold text-2xl text-center">
              About J.A.R.V.I.S
            </h1>
            <p className="text-rose-500 p-8 text-center">
              J.A.R.V.I.S is a chatbot that can answer your questions about
              truth based topics!
              <br />
              Powered by the one and only GPT-3!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
