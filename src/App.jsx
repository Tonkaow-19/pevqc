import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NextPage from "./pages/NextPage";
import Add from "./pages/Add";
import Result from "./pages/inspection result";
import ReAssembly from './pages/Re assembly';
import RecordTime from './pages/Record time';
import FinalStatus from './pages/Final status';
import StatusProblem from './pages/status problem';
import CorrectiveMeeting from './pages/corrective meeting';
import ListForRepair from './pages/list for repair';
import ListResult from './pages/list result';
import Username from './pages/user and password';
import Search from './pages/search';
import ReCheckInspector2 from './pages/recheck';
import Edit from './pages/statusedit';
import Edit2 from './pages/statusedit2';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<Username />} />
        <Route path="/" element={<Home />} />
        <Route path="/next" element={<NextPage />} />
        <Route path="/add" element={<Add />} />
        <Route path="/result" element={<Result />} />
        <Route path="/reass" element={<ReAssembly />} />
        <Route path="/rectime" element={<RecordTime />} />
        <Route path="/final" element={<FinalStatus />} />
        <Route path="/statusprob" element={<StatusProblem />} />
        <Route path="/corrective" element={<CorrectiveMeeting />} />
        <Route path="/list" element={<ListForRepair />} />
        <Route path="/listre" element={<ListResult />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recheck" element={<ReCheckInspector2 />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit2" element={<Edit2 />} />
      </Routes>
    </Router>
  );
}

