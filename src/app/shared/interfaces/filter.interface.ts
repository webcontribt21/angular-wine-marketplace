export class Filter {
  constructor(
    public title: string,
    public data: FilterData[],
    public typeNo?: number,
    public isPanelOpen?: boolean
  ) {}
}

export class FilterData {
  constructor(
    public description: string,
    public parent: string,
    public count: number,
    public parentTypeNo?: number,
    public filterName?: string,
    public filterValue?: string
  ) {}
}
