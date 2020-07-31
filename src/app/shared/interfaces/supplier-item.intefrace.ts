import {Item} from './item.interface';
import {Supplier} from './supplier.interface';

export class SupplierItem {

  constructor(
    public _id: string = '',
    public item_id: string = '',
    public soldInMultiplesOf: number = 0,
    public stockQty: number = 0,
    public price: number = 0,
    public discountedPrice: number = 0,
    public usedOrNew: string = '',
    public condition: string = '',
    public sku: string = '',
    public activeStatusNo: number = 0,
    public supplier_id: string = '',
    public item: Item = <Item>{},
    public supplier: Supplier = <Supplier>{},
  ) { }
}
