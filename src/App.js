import { useEffect, useState } from 'react';
import './App.css';
import data from './wine-data.json'
import DataTable from './components/data-table'
import { getMeanData, getMedianData, getModeData } from './utils';

function App() {
  const [showFlavanoids, setShowFlavanoids] = useState(false);
  const [showData, setShowData] = useState(false)
  const [showGamma, setShowGamma] = useState(false);
  const [class1Alcohol, setClass1Alcohol] = useState([])
  const [class2Alcohol, setClass2Alcohol] = useState([])
  const [class3Alcohol, setClass3Alcohol] = useState([])
  const [class4Alcohol, setClass4Alcohol] = useState([])
  const [measureData, setMeasureData] = useState({});
  useEffect(() => {
    transformData();
  }, [data]);

  useEffect(() => {
    calculateMeasure();
    if(showFlavanoids) {
      calculateMeasure()
    }
    if(showGamma) {
      calculateMeasure()
    }
  }, [showFlavanoids, showGamma]) 

  const transformData = () => {
    let type1 = [], type2 = [], type3 = [], type4 = [];
    data.forEach(item => {
      item.Gamma = ((item?.Ash * item?.Hue) / item?.Magnesium).toFixed(3)
      if(item?.Alcohol === 1) {
        type1.push(item)
      } else if(item?.Alcohol === 2) {
        type2.push(item)
      } else if(item?.Alcohol === 3) {
        type3.push(item)
      } else {
        type4.push(item)
      }
    });
    setClass1Alcohol(type1);
    setClass2Alcohol(type2);
    setClass3Alcohol(type3);
    // filterData(data);
  }

  const calculateMeasure = () => {
    const data = {
      name: showFlavanoids ? 'Flavanoids' : 'Gamma',
      dataVal: []
    }
    let mean = getMeanData(`${showFlavanoids ? 'Flavanoids' : 'Gamma'}`,class1Alcohol, class2Alcohol, class3Alcohol);
    let median = getMedianData(`${showFlavanoids ? 'Flavanoids' : 'Gamma'}`,class1Alcohol, class2Alcohol, class3Alcohol);
    let mode = getModeData(`${showFlavanoids ? 'Flavanoids' : 'Gamma'}`,class1Alcohol, class2Alcohol, class3Alcohol);
    data.dataVal.push(mean);
    data.dataVal.push(median);
    data.dataVal.push(mode);
    setMeasureData(data);
  }



  const btnHandler = (type) => {
    if(type === 'flavanoids') {
      setShowFlavanoids(true)
      setShowGamma(false)
      setShowData(true)
    } else {
      setShowGamma(true);
      setShowFlavanoids(false);
      setShowData(true);
    }
  }

  return (
    <div className="App" style={{margin: 'auto'}}>
      <h3>Welcome To Manufac!</h3>
      <div>
        <button onClick={() => btnHandler('flavanoids')}>Get Flavanoids!</button>
        <button onClick={() => btnHandler('gamma')}>Get Gamma!</button>
      </div>
      
      {
        showData && <DataTable data={measureData} />
      }
      
     
      
    </div>
  );
}

export default App;
