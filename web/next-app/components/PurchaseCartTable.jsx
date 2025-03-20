"use client"

import React from "react";
import { useCart } from "@/context/CartContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from 'lucide-react'

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    cell: ({ row }) => <div>{row.getValue("unit_price")}</div>,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => <div>{row.getValue("total_price")}</div>,
  },
];

export function PurchaseCartTable() {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length ? (
              cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex cartItems-center">
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-l"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-r"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{`₱${item.unit_price}`}</TableCell>
                  <TableCell>{`₱${item.total_price.toFixed(2)}`}</TableCell>
                  <TableCell>
                    <button
                      className="px-2 py-1 text-white rounded"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 color="#343434" strokeWidth={1.25} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No Items in cart. Add an item by searching.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
