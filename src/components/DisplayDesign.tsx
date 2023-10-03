import { useState, useMemo, useRef, useEffect } from 'react';
import { Design, Configuration } from '../types.ts';
import classNames from 'classnames';

interface Props {
  design: Design;
  configuration: Configuration;
}

export default function DisplayDesign(props: Props) {
  switch (props.design.type) {
    case "nuclearcraft:overhaul_sfr":
      return <DisplayOverhaulSFR {...props} />
      break;

    default:
      return <div>Design type "{design.type}" not supported!</div>;
      break;
  }
}

function DisplayOverhaulSFR({ design, configuration }: Props) {
  const [ imageSize, setImageSize ] = useState(16);
  const [ blur, setBlur ] = useState(false);

  const elemRef = useRef(null);

  useEffect(() => {
    if (!elemRef.current) {
      return;
    }

    elemRef.current.addEventListener("wheel", scrollEvent, { passive: false });
    return () => {
      elemRef.current.removeEventListener("wheel", scrollEvent);
    }
  });

  const blockArray = useMemo(() => {
    const [ sx, sy, sz ] = design.dimensions;

    return new Array(sy)
        .fill(undefined)
        .map((_, y) => new Array(sx)
            .fill(undefined)
            .map((_, x) => new Array(sz)
                .fill(undefined)
                .map((_, z) => design.design[x + y * sx + z * sx * sy ])));
  }, [ design ]);

  const scrollEvent = (e: any) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setImageSize(s => s + Math.sign(e.wheelDelta));
    }
  };

  return <div
        className={classNames("display-design--3d", {"display-design__pixelated": !blur})}
        ref={elemRef}>
    { blockArray.map((slice, y) => 
      <div key={y}>
        { slice.map((row, x) => 
          <div key={x}>
            { row.map((index, z) => {
              if (index === -1) {
                return <span key={z} style={{ minWidth: imageSize, minHeight: imageSize }} />;
              }
              const block = configuration.blocks[index];
              return <img key={z} src={"data:image/png;base64," + block.modules["plannerator:texture"].texture} alt={block.name} width={imageSize} height={imageSize} />
            })}
          </div>
        )}
      </div>
    )}
  </div>;
}
