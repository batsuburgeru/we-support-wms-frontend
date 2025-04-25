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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RotateCw, ArrowUpDown, MoreHorizontal, FileDown } from 'lucide-react';
import Link from 'next/link';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
import { useCart } from "@/context/CartContext";
import DataPopover from "@/components/DataPopover";
import DatePicker from '@/components/DatePicker';

export function ClientUserTable(props) {
  toastConfig({
    theme: 'dark',
  });

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState([]);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [role, setRole] = React.useState("");
  
  React.useEffect(() => {
    fetch("http://localhost:3002/users/view-users", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
      if (result && result.users) {
          setData(result.users.filter(props.condition));
      } else {
          console.log("Retrieve failed:", result.message || "No data property");
      }
    })  
    .catch(error => {
        console.log('Error:', error);
    });
  }, [refreshKey, props.changeIndicator]);

  const confirmDelete = () => {
    fetch(`http://localhost:3002/users/delete-user/${props.deletingId}`, {
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
        props.setShowAlert(false); // Hide the confirmation dialog
        props.setDeletingId(null); // Reset the deleting ID
      });
  };

  const cancelDelete = () => {
    props.setShowAlert(false); // Hide the confirmation dialog
    props.setDeletingId(null); // Reset the deleting ID
  };

  const confirmEdit = () => {
    const formData = new FormData();
    formData.append("role", role);

    fetch(`http://localhost:3002/users/update-user/${props.editingId}`, {
      method: "PUT",
      body: formData,
      credentials: "include"
    })
    .then((response) => response.json())
    .then((result) => {
      console.log("Deletion Response:", result);
      if (result && result.updatedUser) {
        setRefreshKey((prevKey) => prevKey + 1);
        toast("Role changed successfully.");
      } else {
        console.error("Update failed:", result.message || "Invalid response format");
      }
    })
    .catch((error) => console.error("Error during update:", error))
    .finally(() => {
      props.setShowEditModal(false); // Hide the confirmation dialog
      props.setEditingId(null); // Reset the deleting ID
    });
  };

  const cancelEdit = () => {
    props.setShowEditModal(false);
    props.setEditingId(null);
  };

  const table = useReactTable({
    data,
    columns: props.columns,
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
          value={(table.getColumn(props.filterValue)?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(props.filterValue)?.setFilterValue(event.target.value)
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
                        <Link href={`/user-details/${data[row.id].id}`}>
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
                <TableCell colSpan={props.columns.length} className="h-24 text-center">
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
      {props.showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-96 text-left">
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
      {props.showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-96 text-left">
            <h2 className="text-md font-semibold mb-1">Edit Role</h2>
            <div className="flex justify-between items-center my-4">
              <label htmlFor="organization" className="py-3 text-black font-medium">Role</label>
              <select
                name="roles"
                id="roles"
                className="col-span-2 border border-borderLine rounded-md px-4 py-2 text-black w-full ml-10"
                defaultValue={"placeholder"}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="placeholder" disabled>
                  Client
                </option>
                <option value="WarehouseMan">WarehouseMan</option>
                <option value="Supervisor">Supervisor</option>
                <option value="PlantOfficer">PlantOfficer</option>
                <option value="Guard">Guard</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="space-x-2 flex justify-end">
              <Button
                onClick={cancelEdit}
                className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmEdit}
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
};

export function PurchaseTable({ tableFor, forUser, forUserRole, refresh }) {
  const statusStyles = {
    Approved: "bg-bgApproved text-txtApproved text-center rounded-sm w-max px-2 py-1",
    Pending: "bg-bgPending text-txtPending text-center rounded-sm w-max px-2 py-1",
    Rejected: "bg-bgDenied text-txtDenied text-center rounded-sm w-max px-2 py-1",
    Returned: "bg-bgReturned text-txtReturned text-center rounded-sm w-max px-2 py-1",
    Draft: "bg-bgDraft text-txtDraft text-center rounded-sm w-max px-2 py-1",
  };

  const sapStatusStyles = {
    "Unsynced": "bg-bgDenied text-txtDenied text-center rounded-sm w-max px-2 py-1",
    "Synced": "bg-bgApproved text-txtApproved text-center rounded-sm w-max px-2 py-1",
  }

  toastConfig({
    theme: 'dark',
  });

  const purchaseHistoryColumns = [
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
      accessorKey: "client_name",
      header: "Client",
      cell: ({ row }) => (
        <div>{row.getValue("client_name")}</div>
      ),
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
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(amount);
    
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "sap_sync_status",
      header: "SAP Sync Status",
      cell: ({ row }) => {
        const status = row.getValue("sap_sync_status") === 1 ? "Synced" : "Unsynced";
        const statusClassName = sapStatusStyles[status] || "";
      
        return (
          <div className={statusClassName}>
            {status}
          </div>
        );
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const rowId = row.getValue("id");
        const sapSyncStatus = row.getValue("sap_sync_status");

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
              <DropdownMenuItem 
                onClick={() => {
                  navigator.clipboard.writeText(rowId) 
                  toast("Request ID copied to clipboard.", {maxVisibleToasts: 3});
                }}
              >
                  Copy Request ID
              </DropdownMenuItem>
              {sapSyncStatus === 0 && <DropdownMenuItem onClick={() => sapSyncIndiv(row.original.id)}>
                SAP Sync
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
  const [filterVal, setFilterVal] = React.useState("All");
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [prId, setPrId] = React.useState('');
  const [showDownloadCSVModal, setShowDownloadCSVModal] = React.useState(false);

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
              client_name: item.purchaseRequest.client_name,
              sap_sync_status: item.purchaseRequest.sap_sync_status,
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
  }, [refreshKey, refresh]);

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
          toast("Purchase request successfully deleted");
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

  const sapSyncIndiv = (id) => {
    fetch('http://localhost:3002/sapSyncLogs/sap-sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "pr_id": id }),
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((result) => {
      if (result && result.message === "SAP sync successful") {
        toast(`SAP Sync successfully completed for this purchase request with Transaction ID: ${result.transaction_id}`);
        setRefreshKey((prevKey) => prevKey + 1)
      }
      else if (result && result.error === "SAP sync failed") {
        toast(`SAP Sync failed for this purchase request. Please try again.`);
      }
      else {
        toast("SAP Sync failed. Please try again.", {maxVisibleToasts: 1});
      }
    })
    .catch((error) => console.error("Error during syncing:", error));
  }

  const sapSyncAll = () => {
    fetch('http://localhost:3002/sapSyncLogs/sap-sync-all/', {
      method: 'POST',
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.summary && result.summary.failed === 0) {
        toast("SAP Sync successfully completed for all purchase requests.");
        setRefreshKey((prevKey) => prevKey + 1)
      }
      else if (result.summary && result.summary.failed > 0) {
        toast(`SAP Sync completed successfully for ${result.summary.success} purchase request${result.summary.success > 1 ? "s" : ""}. ${result.summary.failed} request${result.summary.failed > 1 ? "s" : ""} failed to sync.`);
        setRefreshKey((prevKey) => prevKey + 1)
      }
      else if (result.message === "No unsynced purchase requests found.") {
        toast("All purchase requests already synced!", {maxVisibleToasts: 1});
      }
      else {
        toast("SAP Sync failed. Please try again.", {maxVisibleToasts: 1});
      }
    })
    .catch((error) => console.error("Error during syncing:", error));
  };

  const cancelDownloadCSV = () => {
    setShowDownloadCSVModal(false);
    setStartDate("");
    setEndDate("");
    setStatus("");
    setPrId("");
  };
  
  const clearDownloadCSV = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    setPrId("");
  };

  const confirmDownloadCSV = (startDate, endDate, status, prId) => {
    // Construct query parameters dynamically
    const queryParams = new URLSearchParams();

    if (status) queryParams.append("status", status);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (prId) queryParams.append("prId", prId);

    // Build the full URL with query parameters
    const url = `http://localhost:3002/sapSyncLogs/export-sap-sync-logs?${queryParams.toString()}`;

    fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'text/csv',
      },
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        toast('No SAP Sync logs found for the given filters.', {maxVisibleToasts: 1});
      }
      else {
        return response.blob();
      }
    })
    .then((blob) => {
      if (blob) {
        const objectURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = 'sap_sync_logs.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(objectURL); // Clean up
      } 
    })
    .catch((error) => console.error('Error downloading CSV:', error));
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
  
  const statusList = [
    {
      id: "All",
      name: "Status: All",
    },
    {
      id: "Approved",
      name: "Status: Approved",
    },
    {
      id: "Rejected",
      name: "Status: Rejected",
    },
    {
      id: "Pending",
      name: "Status: Pending",
    },
    {
      id: "Returned",
      name: "Status: Returned",
    },
    {
      id: "Draft",
      name: "Status: Draft",
    },
  ];

  const table = useReactTable({
    data,
    columns: purchaseHistoryColumns,
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

  React.useEffect(() => {
    if (forUserRole === "Client") {
      table.getColumn("client_name")?.setFilterValue(forUser);
    }
    else {
      table.getColumn("created_by_name")?.setFilterValue(forUser);
    }
  }, [forUser, table]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <button onClick={()=>setRefreshKey((prevKey) => prevKey + 1)} className="hover:bg-buttonBG rounded-md p-2 active:bg-neutral-300 colorTransition duration-200">
          <RotateCw color="#696969" size={20} />
        </button>
        <div className="flex justify-between w-full">
          <Input
            placeholder="Filter by client..."
            value={((table.getColumn("client_name")?.getFilterValue()) ?? "")}
            onChange={(event) =>
              table.getColumn("client_name")?.setFilterValue(event.target.value)
            }
            className={`max-w-sm ${tableFor === "userDetails" || tableFor === "dashboard" ? "hidden" : ""}`}
          />
          <div className="flex gap-4">
            {tableFor === "purchaseList" && (<div className="flex gap-2">
              <button onClick={sapSyncAll} className="hover:bg-buttonBG rounded-md p-2 active:bg-neutral-300 text-neutral-600 text-xs text-nowrap flex gap-1 items-center w-max colorTransition duration-200">
                <RotateCw color="#696969" size={20} />
                SAP
              </button>
              <button onClick={() => setShowDownloadCSVModal(true)} className="hover:bg-buttonBG rounded-md p-2 active:bg-neutral-300 text-neutral-600 text-xs text-nowrap flex gap-1 items-center w-max colorTransition duration-200">
                <FileDown color="#696969" size={20} />
                CSV
              </button>
            </div>)}
            <DataPopover
              popoverFor="status"
              value={filterVal}
              setValue={(newVal) => {
                setFilterVal(newVal);
                table.getColumn("status")?.setFilterValue(newVal === "All" ? "" : newVal);
              }}
              data={statusList}
              commandEmpty="No status available."
              placeholder="Search status"
            />
          </div>
        </div>
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
                <TableCell colSpan={purchaseHistoryColumns.length} className="h-24 text-center">
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
          <div className="bg-white p-6 rounded-xl shadow-md w-96 text-left">
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
      {showDownloadCSVModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-max text-left">
            <h2 className="text-xl font-bold mb-4">Download Purchase Request CSV</h2>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button
                onClick={clearDownloadCSV}
                className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
              >
                Clear Filters
              </Button>
            </div>
            <div className="flex items-center gap-20 mb-4">
              <label htmlFor="prId" className="text-black font-medium text-nowrap">Purchase Request ID</label>
              <input
                type="text"
                id="prId"
                name="prId"
                value={prId}
                onChange={(e) => setPrId(e.target.value)}
                className="border border-borderLine rounded-md py-1 px-2 focus:outline-none focus:border-brand-secondary w-full"
              />
            </div>
            <div className="flex gap-48 mb-8">
              <p className="py-1 text-black font-medium">Status</p>
              <div className="flex gap-4">
                <button 
                  key="Success" 
                  onClick={() => setStatus("Success")} 
                  className={`${
                    status === "Success"
                      ? 'bg-brand-secondary text-white px-4 hover:bg-orange-600 active:bg-orange-700'
                      : 'px-4 text-neutral-500 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400'
                  } rounded-md colorTransition`}
                >
                  Success
                </button>
                <button 
                  key="Failed" 
                  onClick={() => setStatus("Failed")} 
                  className={`${
                    status === "Failed"
                      ? 'bg-brand-secondary text-white px-4 hover:bg-orange-600 active:bg-orange-700'
                      : 'px-4 text-neutral-500 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400'
                  } rounded-md colorTransition`}
                >
                  Failed
                </button>
              </div>
            </div>
            <div className="flex w-full gap-6 items-center mb-4">
              <h3 className="font-medium text-nowrap">Date Range</h3>
              <hr className="w-full" />
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-6 gap-2 mb-10 font-medium">
              <div className="flex justify-between lg:justify-start items-center gap-2 mb-4">
                <p>Start Date</p>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="flex justify-between lg:justify-start items-center gap-2 mb-4">
                <p>End Date</p>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
            <div className="space-x-2 flex justify-end">
              <Button
                onClick={cancelDownloadCSV}
                className="bg-white border border-borderLine px-4 py-2 rounded-md hover:bg-gray-200 active:bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={() => confirmDownloadCSV(startDate, endDate, status, prId)}
                className="bg-brand-secondary text-white px-4 py-2 rounded-md hover:bg-orange-600 active:bg-orange-700"
              >
                <FileDown color="#FFF" size={20} />
                Download CSV
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function InventoryTable() {
  const inventoryColumns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "Product ID",
      cell: ({ row }) => (
        <div>{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "img_url",
      header: "Image",
      cell: ({ row }) => (
        // <img src={row.getValue("img_url")} className="w-6"/>
        <div>{row.getValue("img_url")}</div>
      ),
    },
    {
      accessorKey: "sku",
      header: "Serial Number",
      cell: ({ row }) => (
        <div>{row.getValue("sku")}</div>
      ),
    },
    {
      accessorKey: "stock_quantity",
      header: "Stock on Hand",
      cell: ({ row }) => (
        <div>{row.getValue("stock_quantity")}</div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState([]);
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  React.useEffect(() => {
    fetch("http://localhost:3002/products/view-products", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.products) {
        setData(result.products);
        } else {
        console.log('Retrieve failed:', result.message);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
  }, [refreshKey]);

  const table = useReactTable({
    data,
    columns: inventoryColumns,
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
                <TableCell colSpan={inventoryColumns.length} className="h-24 text-center">
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
    </div>
  );
};
