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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusStyles = {
  Approved: "bg-bgApproved text-txtApproved text-center rounded-sm w-max px-2 py-1",
  Pending: "bg-bgPending text-txtPending text-center rounded-sm w-max px-2 py-1",
  Rejected: "bg-bgDenied text-txtDenied text-center rounded-sm w-max px-2 py-1",
  Returned: "bg-bgReturned text-txtReturned text-center rounded-sm w-max px-2 py-1",
  Draft: "bg-bgDraft text-txtDraft text-center rounded-sm w-max px-2 py-1",
};

export function PurchaseTable() {
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request #
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Order Date",
      cell: ({ row }) => (
        <div>{row.getValue("created_at").slice(0,10)}</div>
      ),
    },
    {
      accessorKey: "created_by",
      header: "Created By",
      cell: ({ row }) => (
        <div>{row.getValue("created_by")}</div>
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
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit Request
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                Delete Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3002/purchaseRequests/read-purchase-requests", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data) {
          const transformedData = result.data.map((item) => {
            const totalAmount = item.prItems.reduce((sum, prItem) => {
              return sum + parseFloat(prItem.total_price);
            }, 0);
  
            return {
              id: item.purchaseRequest.id,
              created_by: item.purchaseRequest.created_by,
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
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3002/purchaseRequests/delete-purchase-request/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Deletion Response:", result);

        if (result && result.purchaseRequest) {
          // Update the data state to remove the deleted item
          setData((prevData) =>
            prevData.filter((item) => item.id !== result.purchaseRequest.id)
          );
          console.log(result.message); 
        } else {
          console.error("Retrieve failed:", result.message || "Invalid response format");
        }
      })
      .catch((error) => console.error("Error during deletion:", error));
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by date..."
          value={(table.getColumn("created_at")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("created_at")?.setFilterValue(event.target.value)
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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
    </div>
  );
}
