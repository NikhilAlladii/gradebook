import React from 'react'
import Typography from '@mui/material/Typography';
import "./Heading.css"
// import Box from '@mui/material/Box';

function Heading() {
  return (
    <div className='d-flex flex-column align-items-center mt-5'>
    <div className='conatiner1'></div>
     <div className='conatiner2'>
     <Typography>Title :- John</Typography>
     <Typography>Date :- 20-07-2022</Typography>
     <Typography>Professors Name :- Abhram</Typography>
     <Typography>College :- Vaagdevi Engineering College</Typography>
     <Typography>Department :- Computer Science and Engineering</Typography>
     <Typography>Semister :- IV-II</Typography>
     <Typography>Group :- B</Typography>
     </div>
     <div className='conatiner3'></div>
     </div>
  )
}

export default Heading
