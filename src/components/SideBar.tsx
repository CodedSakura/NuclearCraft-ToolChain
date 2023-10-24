import {useContext, useState} from "react";
import {NCPFConfigurationContext} from "../App";
import {Design} from "../types";
import style from "./SideBar.module.scss";

interface Props {
  design: Design | null;
}

interface ExtendedProps extends Props {
  configuration: Record<string, any>;
}

export default function SideBar(props: Props) {
  const configuration = (useContext(NCPFConfigurationContext) ?? {})[props.design?.type ?? ""];

  if (!props.design) {
    return <div/>;
  }

  if (!configuration) {
    return <div/>;
  }

  switch (props.design.type) {
    case "nuclearcraft:overhaul_sfr":
      return <SideBarOverhaulSFR {...props} configuration={configuration}/>

    default:
      return <div/>;
  }
}

function fullId(v: any) {
  if (v.metadata) {
    return `${v.name}:${v.metadata}`;
  }
  return v.name;
}

function matchSearch(search: string): (v: any) => boolean {
  return block => {
    if (!block.modules["plannerator:display_name"]?.display_name) {
      return false;
    }
    return block.modules["plannerator:display_name"].display_name
        .toLowerCase()
        .includes(search.toLowerCase());
  }
}

function SideBarOverhaulSFR({configuration}: ExtendedProps) {
  const [search, setSearch] = useState("");
  console.log(configuration.blocks);
  return <div className={style.sidebar} style={{width: window.innerWidth / 4}}>
    <form>
      <input
          placeholder="search"
          value={search}
          onChange={(v) => setSearch(v.target.value)}
          onContextMenu={e => {
            e.preventDefault();
            (e.target as HTMLInputElement).focus();
            setSearch("");
          }}/>
    </form>
    <div>
      {configuration.blocks
          .filter(matchSearch(search))
          .map((block: any) => <div>
            <img
                key={fullId(block)}
                src={"data:image/png;base64," + block.modules["plannerator:texture"]["texture"]}
                alt={block.modules["plannerator:display_name"].display_name}
                title={block.modules["plannerator:display_name"].display_name}
                width={32}
                height={32}/>
          </div>)}
    </div>
  </div>;
}