import { Button } from "@/components/ui/button";
import { dataColumns } from "@/components/ui/data-columns";
import { DataTable } from "@/components/ui/data-table";
import db from "@/lib/dbConfig";
import formatOrders from "@/lib/formatOrders";
import { Order } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { CircleDollarSign, CircleFadingPlus, CirclePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "orders"));
  console.log("Orders:");

  const formattedOrders: Order[] = formatOrders(querySnapshot);

//console.log(JSON.stringify(formattedOrders, null, 2));

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
      <div className="pb-6 px-3 py-5">
        <h2 className="text-2xl font-bold tracking-tight">Sales View</h2>
        <p className="text-muted-foreground">
          Here&apos;s the list of orders 
        </p>
      </div>
      <DataTable columns={dataColumns} data={formattedOrders} />
    </main>
  );
}
