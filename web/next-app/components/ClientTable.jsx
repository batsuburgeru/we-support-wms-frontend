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
import { MoreHorizontal } from "lucide-react";

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
import { RotateCw } from 'lucide-react'
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';

export function ClientTable({ changeIndicator }) {
  toastConfig({
    theme: 'dark',
  });

  const columns = [
    {
      accessorKey: "org_name",
      header: "Client Name",
      cell: ({ row }) => (
        <div>{row.getValue("org_name")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name of Contact",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "contact_num",
      header: "Phone",
      cell: ({ row }) => (
        <div>{row.getValue("contact_num")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div>{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "comp_add",
      header: "Address",
      cell: ({ row }) => (
        <div>{row.getValue("comp_add")}</div>
      ),
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
              <DropdownMenuItem>
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                Delete
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
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);
  
  React.useEffect(() => {
    fetch("http://localhost:3002/users/view-users", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.users) {
          setData(result.users.filter(user => user.role === "Client"));
      } else {
          console.log("Retrieve failed:", result.message || "No data property");
      }
    })  
    .catch(error => {
        console.log('Error:', error);
    });
  }, [refreshKey, changeIndicator]);

  const handleDelete = (id) => {
    setDeletingId(id); // Set the ID for the row being deleted
    setShowAlert(true); // Show the confirmation dialog
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3002/users/delete-user/${deletingId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Deletion Response:", result);

        if (result && result.user) {
          setData((prevData) =>
            prevData.filter((item) => item.id !== result.user.id)
          );
          toast("User successfully deleted");
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
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
            <h2 className="text-md font-semibold mb-1">Are you sure you want to delete this user?</h2>
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
