export class SortBy {
  constructor(
    public orderBy: string = '',
    public description: string = '',
    public type: string = '',
  ) { }
}

export interface Sort {
  label: string;
  value: string;
}
