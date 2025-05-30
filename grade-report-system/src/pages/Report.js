import React,{useState} from 'react';
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from './AuthContext';


const Report = () => {
  const { user } = useAuth();
  const [open, setOpen]= useState(true);
  const [selectedSemester, setSelectedSemester] = useState('grade'); 
   

    const Menus =[
      {title: "Dashboard",src: "Chart_fill", path:"/dashboard"},
      {title: "Missing Grade Form", src: "Search", path: "/search"},
      {title: "Grade Report", src: "Chart", path:"/Report"},
      {title: "Instructor Contact", src: "Folder", gap: true, path:"/Contact"},
      {title: "Help and Support", src: "Chat", path:"/Support"},
    ]
    const handleMenuClick = (title) => {
      setOpen(!open);
    };

    const renderGrades = (semester) => {
      if (!user || !user[selectedSemester]) {
        return null;
      }
  
      return (
        <div className='pt-[10px]'>
          <div className='grid grid-cols-3 gap-4'>
            {user[semester].Course.map((course, index) => (
              <div key={index} className='bg-white p-4 rounded-md border border-gray-300'>
                <p className='font-bold'>{course}</p>
                <p>Grade: {user[semester].grading[index]}</p>
                <p>Credits: {user[semester].credits[index]}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
   
   
    
  return (
    <div className="flex">
        <div className={`${open? "w-72" :"w-20"} duration-300 h-screen bg-[#000435] relative`}>
        <img src={require("../assets/control.png")} 
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-[#000435] ${!open && "rotate-180"}`}
        onClick={()=> setOpen(!open)}
        />
        <div>
            <img src={require("../assets/uglogo.png")} className= {`cursor-poiter duration-500`} />
            <h1 className={`text-white mt-[-50px] ml-[85px] font-medium text-xl duration-300 ${!open && 'hidden'}`}>UG|Ghana</h1>
        </div>
        <ul>
            {Menus.map((menu,index)=>
              <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.gap? "mt-18" : "mt-12"}`}>
                <Link to={menu.path} onClick={() => handleMenuClick(menu.title)}>
                  <img src={require(`../assets/${menu.src}.png`)} onClick={() => handleMenuClick(menu.title)}/>
                </Link>
                <Link to={menu.path} onClick={() => handleMenuClick(menu.title)}>
                  <span className={`${!open && 'hidden'} origin-left duration-200 text-2xl`} onClick={() => handleMenuClick(menu.title)} >{menu.title}</span>
                </Link>
              </li>)}
        </ul>
        </div>
        <div className="p-7 text-2x1 font-semibold flex-1 h-screen bg-[#ece3e9]">
          <div>
          <div>
            <label htmlFor='semester'>Select Semester:</label>
            <select
              id='semester'
              onChange={(e) => setSelectedSemester(e.target.value)}
              value={selectedSemester}
              className='ml-2'
            >
              <option value='grade'>Semester 1</option>
              <option value='grade2'>Semester 2</option>
              <option value='grade3'>Semester 3</option>
            </select>
          </div>
          {renderGrades(selectedSemester)}
        </div>
      </div>
    </div>
  )
}

export default Report

