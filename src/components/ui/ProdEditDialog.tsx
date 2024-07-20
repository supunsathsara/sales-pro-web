import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Product } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import db from "@/lib/dbConfig";
import { useToast } from "./use-toast";

interface ProductEditDialogProps {
  product: Product;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({ product }) => {
  const [qty, setQty] = useState(product.qty);
  const [price, setPrice] = useState(product.price);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast()

  async function updateQtyandPrice(productId: string, qty: number, price: number) {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        qty: qty,
        price: price,
      });
      console.log(`Product ${productId} updated`);
      window.location.reload(); // Optional: Refresh the page or re-fetch data
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }
  const handleSaveChanges =async  () => {
    setIsUpdating(true);
    await updateQtyandPrice(product.id as string, qty, price);
    toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      })
    setIsUpdating(false)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-full p-0">
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the quantity and price of the product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="qty" className="text-right">
              Quantity
            </Label>
            <Input
              id="qty"
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveChanges}>
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;