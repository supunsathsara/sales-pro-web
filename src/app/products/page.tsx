
import { Button } from "@/components/ui/button";
import { dataColumns } from "@/components/ui/product-columns.";
import { ProductTable } from "@/components/ui/product-table";
import db from "@/lib/dbConfig";
import formatOrders from "@/lib/formatOrders";
import { Order, Product } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { CircleDollarSign, CircleFadingPlus } from "lucide-react";
import Link from "next/link";

export default async function ProductPage() {
  const querySnapshot = await getDocs(collection(db, "products"));
  console.log("products:");

  let products: Product[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    // Use type assertion to cast data to Product
    products.push(data as Product);
  });

    //console.log(JSON.stringify(products, null, 2));

  return (
    <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
       <div className="py-8 flex gap-8">
        <Link href="/products">
        <Button variant="default" className="w-full">
          <CircleFadingPlus className="w-8 h-8 mr-2" />
          Products
        </Button>
        </Link>
        <Link href="/">
        <Button variant="default" className="w-full">
          <CircleDollarSign className="w-8 h-8 mr-2" />
          Orders
        </Button>
        </Link>
      </div>
      <div className="pb-6 px-3 py-9">
        <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
        <p className="text-muted-foreground">Here&apos;s the list of orders</p>
      </div>
      <ProductTable columns={dataColumns} data={products} />
    </main>
  );
}
