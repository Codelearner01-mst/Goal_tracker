import { GoalsProvider } from "./utils/context";
import { Main } from "./parent";

function App() {
  return <GoalsProvider>{<Main />}</GoalsProvider>;
}

export default App;
