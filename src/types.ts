export interface Project {
  version: number;
  configuration: Configuration;
  addons?: Addon[];
  designs?: Design[];
  modules: Modules;
}

export type Configuration = Modules & {
  "nuclearcraft:underhaul_sfr"?: {
    blocks: Element[],
    fuels: Element[],
  },
  "nuclearcraft:overhaul_sfr"?: {
    blocks: Element[],
    coolant_recipes: Element[],
  },
  "nuclearcraft:overhaul_msr"?: {
    blocks: Element[],
  },
  "nuclearcraft:overhaul_turbine"?: {
    blocks: Element[],
    recipes: Element[],
  },
};
export type Modules<T = object> = Record<string, T>;

export interface Addon {
  modules: Modules;
  configuration: object;
}

export interface Design {
  type: string;
  modules: Modules;
  design: number[];
  [key: string]: any;
}

export namespace DefinedDesigns {
  export interface UnderhaulSFR extends Design {
    type: "nuclearcraft:underhaul_sfr";
    dimensions: [ number, number, number ];
    fuel: number;
  }

  export interface OverhaulSFR extends Design {
    type: "nuclearcraft:overhaul_sfr";
    dimensions: [ number, number, number ];
    block_recipes: number[];
    coolant_recipe: number;
  }

  export interface OverhaulMSR extends Design {
    type: "nuclearcraft:overhaul_msr";
    dimensions: [ number, number, number ];
    block_recipes: number[];
  }

  export interface OverhaulTubine extends Design {
    type: "nuclearcraft:overhaul_turbine";
    dimensions: [ number, number, number ];
    recipe: number;
  }
}


export interface InfoSegment {
  id: string;
  render: any;
  side: "L"|"C"|"R";
  index: number;
  onClick?: (e: any) => any;
}

