

export interface ProductToInsert {
  name: string;
  description: string;
  price: number;
}


export interface Product extends ProductToInsert {
  id: number;
  
}
