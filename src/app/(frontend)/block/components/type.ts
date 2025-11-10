
export interface Block {
  id: string;
  addmeasures: {
    id: string;
    l: string;
    b: string;
    h: string;
    block_area: string;
    block_cost: string;
  }[];
}

export interface Group {
  g_hydra_cost: string
  g_truck_cost: string
  g_total_cost: string
  date: string
  block: Block[]
  total_block_area: string
  total_block_cost: string
  g_total_block_area: string
  [key: string]: string | Block[]
}

export interface GalaState {
  vender_id: string | Vendor
  todi_cost(todi_cost: any): unknown;
  id: string;
  total_gala_cost: string;
  total_gala_area: string;
  total_block_cost: string;
  total_block_area: string;
  // vender_id: string | number | readonly string[] | undefined;
  munim: string;
  GalaType: string;
  date: Date | string;
  l: string;
  front_b: string;
  back_b: string;
  total_b: string;
  h: string;
  gala_cost: string;
  hydra_cost: string;
  truck_cost: string;
  estimate_cost: string;
  depreciation: string;
  final_cost: string;
  group: Group[];
}


export interface Vendor {
  id: string | number;
  vendor: string;
  vendor_no: string;
  address: string;
  mail_id: string;
  Company_no: string;
  phone: Array<{
    number: string;
    type?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface TodiState {
  vender_id: string | Vendor
  total_cost: string;
  todi_cost: string;
  id: string;
  total_todi_cost: string;
  total_todi_area: string;
  total_block_cost: string;
  total_block_area: string;
  // vender_id: string | number | readonly string[] | undefined;
  munim: string;
  BlockType: string;
  date: Date | string;
  l: string;
  b: string;
  h: string;
  gala_cost: string;
  hydra_cost: string;
  truck_cost: string;
  estimate_cost: string;
  depreciation: string;
  final_cost: string;
  group: Group[];
}







