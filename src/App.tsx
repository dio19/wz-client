import { useState } from 'react';
import {
  BrowserRouter ,
  Routes,
  Route,
} from 'react-router-dom';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { SideMenuItem } from './types/interfaces';
import SideMenu from './components/SideMenu';
import Tasks from './components/Tasks';
import Users from './components/UsersTable';
import UserDetail from './components/UserDetail';
import handleBack from './utils/handleBack';

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
      icon: AssignmentIndIcon,
      url: "/users"
    },
    {
      id: "2",
      label: "Tasks",
      icon: AssignmentTurnedInIcon,
      url: "/tasks"
    },
  ];

  return (
    <BrowserRouter>
    <div>
      <SideMenu items={items} isOpen={isOpen} handleOnClick={handleOnClick}/>
      <Routes>
        <Route path="/" element={<Users isOpen={isOpen}/>}  />
        <Route path="/tasks" element={<Tasks isOpen={isOpen} />} />
        <Route path="/users" element={<Users isOpen={isOpen}/>} />
        <Route path="/users/:id" element={<UserDetail eventHandler={handleBack}/>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;