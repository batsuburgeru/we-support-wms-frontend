"use client";

import React, { useState, useEffect, use } from "react";
import { Pencil, X } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns = [
  {
    accessorKey: "name",
    header: "Item Name",
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

export default function PurchaseRequest({ params }) {
  const resolvedParams = use(params); // Unwrapping the Promise
  const { id } = resolvedParams; // Accessing the unwrapped params object
  const [data, setData] = useState([]); // State to hold the transformed data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3002/purchaseRequests/search-purchase-request?search=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result && result.data) {
          // Transform data
          const transformedData = (result) => {
            if (result && result) {
              const { purchaseRequest, deliveryNote, prItems } = result.data;
          
              // Calculate total amount from prItems
              const totalAmount = prItems.reduce((sum, prItem) => {
                return sum + parseFloat(prItem.total_price);
              }, 0);
              const totalQty = prItems.reduce((sum, prItem) => {
                return sum + parseFloat(prItem.quantity);
              }, 0);
          
              // Transform data
              return {
                id: purchaseRequest.id,
                created_by_name: purchaseRequest.created_by_name,
                created_by_role: purchaseRequest.created_by_role,
                status: purchaseRequest.status,
                approved_by_name: purchaseRequest.approved_by_name,
                created_at: purchaseRequest.created_at.slice(0,10) + " | " + purchaseRequest.created_at.slice(11,19),
                note: deliveryNote.note,
                pr_items: prItems.map((item) => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  unit_price: parseFloat(item.unit_price),
                  total_price: parseFloat(item.total_price),
                })),
                total_amount: totalAmount,
              };
            }
            return null; // Return null if the data format doesn't match
          };
          setData(transformedData(result)); // Save data to state
        } else {
          console.error("Retrieve failed:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]); // Add `id` as a dependency to re-fetch data if it changes

  const statusStyles = {
    Approved: "bg-bgApproved text-txtApproved text-center rounded-sm w-max px-2 py-1 border border-txtApproved",
    Pending: "bg-bgPending text-txtPending text-center rounded-sm w-max px-2 py-1 border border-txtPending",
    Rejected: "bg-bgDenied text-txtDenied text-center rounded-sm w-max px-2 py-1 border border-txtDenied",
    Returned: "bg-bgReturned text-txtReturned text-center rounded-sm w-max px-2 py-1 border border-txtReturned",
    Draft: "bg-bgDraft text-txtDraft text-center rounded-sm w-max px-2 py-1 border border-txtDraft",
  };

  const status = data.status;
  const statusClassName = statusStyles[status] || "";

  return (
    <main>
      <div className="flex justify-between px-6 py-6">
        <div className="flex">
          <div>
            <h2 className="font-semibold text-lg">{data.created_by_name}</h2>
            <h3 className="text-neutral-500 text-sm">{data.created_by_role}</h3>
          </div>
          {data.approved_by_name && <hr className="h-full border border-borderLine mx-8" />}
          {data.approved_by_name && <div className="font-medium flex flex-col justify-between">
            <h2>Assignee</h2>
            <h3 className="text-sm">{data.approved_by_name}</h3>
          </div>}
        </div>
        <div className="flex">
          {(data.status === "Pending" || data.status === "Draft"|| data.status === "Returned") && <Link href={`/edit-purchase-request/${data.id}`} className="border border-borderLine rounded-sm h-fit p-1 mx-1"><Pencil /></Link>}
          <Link href="/purchase-list" className="border border-borderLine rounded-sm h-fit p-1 mx-1"><X /></Link>
        </div>
      </div>
      <hr />
      <section className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Purchase Information</h1>
          <div className={statusClassName}>
            <span className="text-black font-light">Status: </span>
            <span className="font-semibold">{data.status}</span>
          </div>
        </div>
        <h2>Purchase Order# <span className="font-medium">{data.id}</span></h2>
        <div className="mt-10 mb-10">
          <div className="grid grid-flow-col grid-cols-2 text-left w-1/2 mb-4">
            <h3>ORDER DATE</h3>
            <h4>{data.created_at}</h4>
          </div>
          <div className="grid grid-flow-col grid-cols-2 text-left w-1/2 mb-4">
            <h3>CLIENT NAME</h3>
            <h4>{data.created_by_name}</h4>
          </div>
        </div>
        <div className="w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {!data.pr_items ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.pr_items.length > 0 ? (
                data.pr_items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_id}</TableCell>
                    <TableCell>
                      <span className="px-3">{item.quantity}</span>
                    </TableCell>
                    <TableCell>{`₱${item.unit_price}`}</TableCell>
                    <TableCell>{`₱${item.total_price}`}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <h2>Note:</h2>
          <p className="bg-navBG p-4 rounded-lg mt-2 font-medium">{data.note}</p>
        </div>
        <div className="bg-navBG flex flex-col justify-between p-6 rounded-md ml-8 w-[500px] min-w-96">
          <div className="flex justify-between">
            <div>
              <p className="font-medium mb-2">Sub Total</p>
              <p className="font-medium text-sm">Total Quantity: {data.total_qty}</p>
            </div>
            <p className="font-medium">
              ₱{data.total_amount}
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <h2 className="font-semibold">Total</h2>
            <h2 className="font-semibold">₱{data.total_amount}</h2>
          </div>
        </div>
      </div>
      </section>
    </main>
  );
}
