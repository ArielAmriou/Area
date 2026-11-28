import './App.css';
import { HeaderNavigationBase } from '@/components/application/app-navigation/header-navigation'
import { Nodes } from '@/components/application/nodes/nodes'

const simpleItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];
 
function App() {
  return (
    <div className="App">
      <HeaderNavigationBase activeUrl="/dashboard" items={simpleItems} />
      <Nodes />
    </div>
  );
}

export default App;
