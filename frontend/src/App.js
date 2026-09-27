import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import TasklyApp from "@/pages/TasklyApp";

function App() {
  return (
    <div className="App">
      <TasklyApp />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
