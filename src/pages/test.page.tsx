import React, { useState } from 'react'

//节流处理
export default function Testpage() {
  const [results, setResults] = useState([]);
  const handleInput = (e: any) => {
    const value = e.target.value;
    setResults(value.split(''))
  }
  const handleInputThrottled = () => {
  }
  return (
    <div>
      <input placeholder='input search' onChange={handleInput} />
      <input placeholder='input search throttled' onChange={handleInputThrottled} />
      <>
        {
          results.map(result => result)
        }
      </>
    </div>
  )
}
