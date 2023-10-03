import { useState, useEffect, createContext, useMemo } from 'react';
import { Project, Configuration, InfoSegment } from './types.ts';
import DisplayDesign from './components/DisplayDesign.tsx';
import './App.scss';

const filename = "/project.ncpf.json";

export const NCPFConfigurationContext = createContext<null|Configuration>(null);
export const BottomBarItemContext = createContext(null);

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState<null|Project>(null);
  const [ bottomBarItems, setBottomBarItems ] = useState<InfoSegment[]>([]);
  const [ [ bbil, bbic, bbir ], setBbi ] = useState<InfoSegment[][]>([[], [], []]);

  useEffect(() => {
    setLoading(true);
    fetch(filename)
      .then(v => v.json())
      .then(v => {
        setData(v);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(data);
  }, [ data ]);

  useEffect(() => {
    const bbi = [
      bottomBarItems
        .filter(v => v.side === "L")
        .sort((a, b) => a.index - b.index)
        .map(v => v.render),
      bottomBarItems
        .filter(v => v.side === "C")
        .sort((a, b) => a.index - b.index)
        .map(v => v.render),
      bottomBarItems
        .filter(v => v.side === "R")
        .sort((a, b) => a.index - b.index)
        .map(v => v.render),
    ];

    console.log(...bbi);
    
    setBbi(bbi);
  }, [ bottomBarItems ]);
  

  const design = loading || !data ? null : data!.designs[0];

  return <NCPFConfigurationContext.Provider value={loading ? null : data.configuration}>
    <BottomBarItemContext.Provider value={[ bottomBarItems, setBottomBarItems ]}>
      <div className="grid--full-width" style={{background: "#f002"}}>nav</div>
      <div style={{background: "#0f02"}}>side</div>
      { design ? <DisplayDesign design={design} /> : <div /> }
      <div style={{background: "#f0f2"}}>q</div>
      <div 
            className="grid--full-width flex--container flex--container__row flex--container__between" 
            style={{background: "#00f2"}}>
        <div>{bbil}</div>
        <div>{bbic}</div>
        <div>{bbir}</div>
      </div>

      { loading ? <div className="modal">
        <div className="modal--content">Loading...</div>
      </div> : null}
    </BottomBarItemContext.Provider>
  </NCPFConfigurationContext.Provider>;
}

export default App
