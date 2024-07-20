"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import db from "@/lib/dbConfig";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { doc, updateDoc } from "firebase/firestore";
import {
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

async function updateStatus(orderId: string) {
  try {
    // Reference to the order document in Firestore
    const orderRef = doc(db, 'orders', orderId);

    // Update the order status to "Complete"
    await updateDoc(orderRef, {
      orderStatus: 'Complete',
    });

    console.log(`Order ${orderId} marked as complete`);
    window.location.reload();
  } catch (error) {
    console.error('Error updating order status:', error);
  }
  
}

export const dataColumns: ColumnDef<Order>[] = [
  {
    id: "orderId",
    accessorKey: "orderId",
    header: "Order id",

  },
  {
    accessorKey: "orderDate",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original;
      return (
        Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "LKR",
        }).format(order.total)
      );
    },
  },
  
  {
    accessorKey: "products",
    header: "Ordered products",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <ul className="list-disc list-inside">
          {order.products.map((product) => (
            <li key={product.name}>
                  {product.name} ({product.qty})
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(order.orderId.toString())
              }
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
         
            <DropdownMenuItem
              onClick={() => updateStatus(order.id)}
            >Mark as Complete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
