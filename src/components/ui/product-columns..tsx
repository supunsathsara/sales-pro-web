"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import db from "@/lib/dbConfig";
import { Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { doc, updateDoc } from "firebase/firestore";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog
} from "./dialog";
import ProductEditDialog from "./ProdEditDialog";

async function updateStatus(orderId: string) {
  try {
    // Reference to the order document in Firestore
    const orderRef = doc(db, "orders", orderId);

    // Update the order status to "Complete"
    await updateDoc(orderRef, {
      orderStatus: "Complete",
    });

    console.log(`Order ${orderId} marked as complete`);
    window.location.reload();
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

async function updateQtyandPrice(productId: string, qty: number, price: number) {
  try {
    // Reference to the order document in Firestore
    const productRef = doc(db, "products", productId);

    // Update the order status to "Complete"
    await updateDoc(productRef, {
      qty: qty,
      price: price
    });

    console.log(`Product ${productId} updated`);
    window.location.reload();
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

export const dataColumns: ColumnDef<Product>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
      }).format(product.price);
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <Dialog>
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
                  prod.id && navigator.clipboard.writeText(prod.id.toString())
                }
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ProductEditDialog product={prod} />
            </DropdownMenuContent>
            
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
