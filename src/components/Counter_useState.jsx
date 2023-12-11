import { useState } from 'react'

const Counter_useState = () => {

       // ------ counter -------
  const [counter, setCounter] = useState(0);

  const addCounter = () => {
    setCounter(counter + 1);
  }

  const removeCounter = () => {
    setCounter(counter - 1);
  }
    //------------------


  return (
    <div>

             {/* --- header Con Counter --- */}
    <header>
      <h1 className="my-10">Add y Remove counter</h1>
    </header>

    <button onClick={addCounter}>Add</button>

    <span className='mx-5'>{counter}</span>

    <button onClick={removeCounter} >Remove</button>
        

    </div>
  )
}

export default Counter_useState