"use client"

import React from 'react';
import { ClientUserTable } from '@/components/DataTable';
import { NewUserModal } from '@/components/NewUserModal';
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const ClientList = () => {
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div>{row.getValue("role")}</div>
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
                <Link href={`/user-details/${row.original.id}`} className="w-full">
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [changeIndicator, setChangeIndicator] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);
  const condition = user => user.role !== "Client";

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowAlert(true); 
  };

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Users</h1>
        <div className='flex items-center'>
          <NewUserModal setChangeIndicator={setChangeIndicator} />
        </div>
      </div>
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <ClientUserTable 
          columns={columns}
          changeIndicator={changeIndicator}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          condition={condition}
        />
      </section>
    </main>
  )
}

export default ClientList