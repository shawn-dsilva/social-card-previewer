import React, { useState } from 'react';
import axios from "axios";
import CardGen from './CardGen';

function Main() {

  const [input, setInput] = useState("");
  const [data, setData] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { target:`${input}` };
    axios.post('/api/scrapesite',body).then((response) => {
      console.log(response);
      setData(response.data);
    });
}
  return (
    <div>
        <h3 className="underline">Enter the URL of an Open Graph tags compatible site</h3>
        <form className="formContainer" onSubmit={handleSubmit}>
        <input className="inputBox" type="text" value={input} onChange={event => setInput(event.target.value)}/>
      <input className="submitButton" type="submit" value="➜" />
    </form>
        { data ? <div>
          <h3 className="underline" >Social Card Preview</h3>
          <CardGen data={data}/>
        </div> : null}
        
    </div>
      );
}
 
export default Main;