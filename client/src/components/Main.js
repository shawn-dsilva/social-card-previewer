import React, { useState, useEffect } from 'react';
import axios from "axios";
import CardGen from './CardGen';

function Main() {

  const [input, setInput] = useState("");
  const [firstLoad, setfirstLoad] = useState(true);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData()
  }, [setData])

  async function getData(body) {
    setIsLoading(true);
    await axios.post('/api/scrapesite',body).then((response) => {
      console.log(response);
      setData(response.data);
    });
    setIsLoading(false);
  }

 

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { target:`${input}` };
    setfirstLoad(false);
    getData(body);
}
  return (
    <div>
        <h3 className="underline">Enter the URL of an Open Graph tags compatible site</h3>
        <form className="formContainer" onSubmit={handleSubmit}>
        <input className="inputBox" type="text" value={input} onChange={event => setInput(event.target.value)}/>
      <input className="submitButton" type="submit" value="➜" />
    </form>
        {/* { data ? <div>
          <h3 className="underline" >Social Card Preview</h3>
          <CardGen data={data}/>
        </div> : null} */}

        { firstLoad !== true ? 
          (isLoading ? <h1>LOADING...</h1>:
          ( data ? 
          <div>
            <h3 className="underline" >Social Card Preview</h3>
            <CardGen data={data}/>
          </div> : null)
          ):null
        }
        
    </div>
      );
}
 
export default Main;