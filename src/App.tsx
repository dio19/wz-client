import { useState } from 'react';
import {
  BrowserRouter ,
  Routes,
  Route,
} from 'react-router-dom';
import { SideMenuItem } from './types/interfaces';
import { ImUsers } from 'react-icons/im';
import { BiTask } from 'react-icons/bi'
import Home from './components/Home';
import SideMenu from './components/SideMenu';
import Tasks from './components/Tasks';
import Users from './components/UsersTable';

import './App.scss';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  }

  const items: SideMenuItem[] = [
    {
      id: "1",
      label: "Users",
      icon: ImUsers,
      url: "/users"
    },
    {
      id: "2",
      label: "Tasks",
      icon: BiTask,
      url: "/tasks"
    },
  ];

  return (
    <BrowserRouter>
    <div>
      <SideMenu items={items} isOpen={isOpen} handleOnClick={handleOnClick}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users" element={<Users isOpen={isOpen}/>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;