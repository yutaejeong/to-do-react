import ReactDOM from 'react-dom/client';
import { RecoilRoot } from "recoil";
import { Todo } from "./components/Todo";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <div style={{textAlign: "center"}}>
    <h1>ToDo List</h1>
    <Todo />
    </div>
  </RecoilRoot>
);