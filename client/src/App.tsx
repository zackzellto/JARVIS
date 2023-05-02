import axios from "axios";

function App() {
  axios
    .get("http://127.0.0.1:5000/ask")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <header className="flex flex-col items-center justify-center text-2xl">
          <p></p>
        </header>
      </div>
    </>
  );
}

export default App;
