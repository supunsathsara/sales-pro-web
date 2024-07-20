import { Order, OrderProduct } from '@/types';
import { format } from 'date-fns';



interface FirestoreProduct {
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

interface FirestoreOrder {
  orderId: number;
  totalPrice: number;
  orderStatus: string;
  orderDate: number;
  products: FirestoreProduct[];
}

const formatOrders = (querySnapshot: any): Order[] => {
  let orders: Order[] = [];

  querySnapshot.forEach((doc: any) => {
    const data: FirestoreOrder = doc.data();

    // Format the date
    const orderDate = format(new Date(data.orderDate), 'dd MMM yyyy HH:mm:ss');

    // Map the products array
    const products: OrderProduct[] = data.products.map(product => ({
      name: product.product.name,
      qty: product.quantity
    }));

    // Push formatted order to orders array
    orders.push({
      id: doc.id,
      orderId: data.orderId.toString(),
      total: data.totalPrice,
      orderStatus: data.orderStatus,
      orderDate: orderDate,
      products: products 
    });
  });

  return orders;
};

export default formatOrders;