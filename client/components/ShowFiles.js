import React from 'react'
import { getFile } from '@/feat/getfile'
import { useState } from 'react'
import { useEffect } from 'react'
const ShowFiles = ({ fetchedFiles }) => {
  const [decodedFile, setDecodeFile] = useState([]);
  useEffect(() => {
    console.log(fetchedFiles.length);
  }, []);
  return <div>{
      
  }</div>;
};

export default ShowFiles