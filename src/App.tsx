import {createContext, useEffect, useState} from 'react';
import {Configuration, Project} from './types.ts';
import DisplayDesign from './components/DisplayDesign.tsx';
import './App.scss';

const filename = "/project.ncpf.json";

export const NCPFConfigurationContext = createContext<null|Configuration>(null);

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState<null|Project>(null);
  const [ imageSize, setImageSize ] = useState(16);
  const [ blur, setBlur ] = useState(false);

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

  const design = loading || !data ? null : (data.designs ?? [])[0];

  return <NCPFConfigurationContext.Provider value={loading ? null : data?.configuration ?? null}>
    <div className="grid--full-width" style={{background: "#f002"}}>nav</div>
    <div style={{background: "#0f02"}}>side</div>
    { design ? <DisplayDesign {...{ design, imageSize, setImageSize, blur, setBlur }} /> : <div /> }
    <div style={{background: "#f0f2"}}>q</div>
    <div 
          className="grid--full-width flex--container flex--container__row flex--container__between" 
          style={{background: "#00f2"}}>
      <div />
      <div>Size: {imageSize}px</div>
      <div />
    </div>

    { loading ? <div className="modal">
      <div className="modal--content">Loading...</div>
    </div> : null}
  </NCPFConfigurationContext.Provider>;
}

export default App
