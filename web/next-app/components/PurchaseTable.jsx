"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
import { useCart } from "@/context/CartContext";
import { RotateCw } from 'lucide-react'

const statusStyles = {
  Approved: "bg-bgApproved text-txtApproved text-center rounded-sm w-max px-2 py-1",
  Pending: "bg-bgPending text-txtPending text-center rounded-sm w-max px-2 py-1",
  Rejected: "bg-bgDenied text-txtDenied text-center rounded-sm w-max px-2 py-1",
  Returned: "bg-bgReturned text-txtReturned text-center rounded-sm w-max px-2 py-1",
  Draft: "bg-bgDraft text-txtDraft text-center rounded-sm w-max px-2 py-1",
};

export function PurchaseTable() {
  toastConfig({
    theme: 'dark',
  });

  const columns = [
    {
      accessorKey: "id",
      header: "Request #",
      cell: ({ row }) => (<div>{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("created_at").slice(0,10)} | {row.getValue("created_at").slice(11,19)}</div>,
    },
    {
      accessorKey: "created_by_name",
      header: "Created By",
      cell: ({ row }) => (
        <div>{row.getValue("created_by_name")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusClassName = statusStyles[status] || "";
      
        return (
          <div className={statusClassName}>
            {status}
          </div>
        );
      }
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(amount);
    
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const rowId = row.getValue("id");

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/purchase-details/${row.original.id}`} className="w-full">
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === "Draft" && <DropdownMenuItem onClick={() => submitFromDrafts(row.original.id)}>
                Get Approval
              </DropdownMenuItem>}
              {(status === "Pending" || status === "Returned" || status === "Draft") && <DropdownMenuItem onClick={()=>clearCart()}>
                <Link href={`/edit-purchase-request/${rowId}`} className="w-full">
                  Edit
                </Link>
              </DropdownMenuItem>}
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  const [sorting, setSorting] = React.useState([{ id: "created_at", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState([]);
  const { clearCart } = useCart();
  const [showAlert, setShowAlert] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  React.useEffect(() => {
    fetch("http://localhost:3002/purchaseRequests/read-purchase-requests", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result) {
          const transformedData = result.map((item) => {
            const totalAmount = item.prItems.reduce((sum, prItem) => {
              return sum + parseFloat(prItem.total_price);
            }, 0);
  
            return {
              id: item.purchaseRequest.id,
              created_by_name: item.purchaseRequest.created_by_name,
              status: item.purchaseRequest.status,
              created_at: item.purchaseRequest.created_at,
              updated_at: item.purchaseRequest.updated_at,
              amount: totalAmount,
            };
          });
          setData(transformedData);
        } else {
          console.log("Retrieve failed:", result.message);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [refreshKey]);

  const handleDelete = (id) => {
    setDeletingId(id); // Set the ID for the row being deleted
    setShowAlert(true); // Show the confirmation dialog
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3002/purchaseRequests/delete-purchase-request/${deletingId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Deletion Response:", result);

        if (result && result.purchaseRequest) {
          setData((prevData) =>
            prevData.filter((item) => item.id !== result.purchaseRequest.id)
          );
          toast("Item successfully deleted");
        } else {
          console.error("Delete failed:", result.message || "Invalid response format");
        }
      })
      .catch((error) => console.error("Error during deletion:", error))
      .finally(() => {
        setShowAlert(false); // Hide the confirmation dialog
        setDeletingId(null); // Reset the deleting ID
      });
  };

  const cancelDelete = () => {
    setShowAlert(false); // Hide the confirmation dialog
    setDeletingId(null); // Reset the deleting ID
  };

  const submitFromDrafts = (id) => {
    const payload = {
      status: "Pending",
      note: "",
    };
  
    fetch(`http://localhost:3002/purchaseRequests/update-purchase-request-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Update Status:", result);
  
        if (result && result.purchaseRequest) {
          toast("Draft purchase request has now been submitted for approval.")
          setData((prevData) =>
            prevData.map((item) =>
              item.id === result.purchaseRequest.id
                ? { ...item, status: result.purchaseRequest.status }
                : item
            )
          );
        } else {
          console.error("Update failed:", result.message || "Invalid response format");
        }
      })
      .catch((error) => console.error("Error during submission:", error));
  };
  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <button onClick={()=>setRefreshKey((prevKey) => prevKey + 1)} className="hover:bg-buttonBG rounded-md p-2 active:bg-neutral-300 transition-colors duration-200">
          <RotateCw color="#696969" size={20} />
        </button>
        <Input
          placeholder="Filter by status..."
          value={(table.getColumn("status")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id !== "actions" ? (
                        <Link href={`/purchase-details/${data[row.id].id}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Link>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96 text-left">
            <h2 className="text-md font-semibold mb-1">Are you sure you want to delete this request?</h2>
            <p className="mb-6">This action is irreversible.</p>
            <div className="space-x-2 flex justify-end">
              <Button
                onClick={cancelDelete}
                className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
