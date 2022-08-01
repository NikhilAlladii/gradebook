import './App.css';
import Footer from './components/Footer';
import Heading from './components/Heading';
import ResultsTable from './components/ResultsTable';

function App() {
  return (
    <div className='m-5'>
      <Heading/>
      <ResultsTable/>
      <Footer/>
    </div>
  );
}

export default App;
