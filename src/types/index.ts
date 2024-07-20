export interface Product {
  id: string;
  name: string;
  qty: number;
}

export interface Order {
    id:string;
  orderId:string;
  total: number;
  orderStatus: string;
  orderDate: string;
  products: Product[];
}

export interface FirestoreProduct {
  product: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    id: string;
    qty: number;
  };
  quantity: number;
}

export interface FirestoreOrder {
  orderId: number;
  totalPrice: number;
  orderStatus: string;
  orderDate: number;
  products: FirestoreProduct[];
}

// "qty": 12,
//     "name": "Mens Cotton Jacket",
//     "imageUrl": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     "price": 3600,
//     "description": ""

export interface Product{
  name: string;
  qty: number;
  imageUrl: string;
  price: number;
  description: string;
}
