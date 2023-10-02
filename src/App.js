import { Fragment } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';


function App() {
  return (
    <Fragment>
      
        <Header></Header>
        <main>
        <Meals/>
        <Cart></Cart>
      
        </main>
        
    </Fragment>
  );
}

export default App;
