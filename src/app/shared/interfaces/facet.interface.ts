
export interface DataFacet {
  value: string;
  count: number;
}

export interface ValueFacet {
  type: string;
  data: DataFacet[];
}

export interface Facet {
  name: string;
  value: ValueFacet[];
}
