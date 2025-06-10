import { useState } from "react";
import "./App.css";
import { capitalize, formatCurrency, formatDate } from "./utils";
import { ThemeProvider } from "./context/theme-provider";
function App() {
  const [count, setCount] = useState(0);
  const title = capitalize("admin panel");
  const price = formatCurrency(199.99);
  const today = formatDate(new Date());

  return (
    <ThemeProvider>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-center font-bold text-red-500">
          {title} - {price} - {today}
        </div>
        <h1 className="text-3xl">Vite + React</h1>
        <div className="card">
          <button
            className="rounded-md bg-blue-500 p-2 text-white"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;
