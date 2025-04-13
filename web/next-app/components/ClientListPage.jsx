"use client"

import React from 'react';
import { ClientUserTable } from '@/components/DataTable';
import { NewClientModal } from '@/components/NewClientModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from 'next/link';

function ClientList({ userRole }) {
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
                <Link href={`/user-details/${row.original.id}`} className="w-full">
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(row.original.id)}>
                Change Role
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

  const [showAlert, setShowAlert] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [deletingId, setDeletingId] = React.useState(null);
  const [changeIndicator, setChangeIndicator] = React.useState(true);
  const condition = user => user.role === "Client";

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowAlert(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowEditModal(true);
  }

  return (
    <main>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1>Clients</h1>
        {userRole === "Admin" && <div className='flex items-center'>
          <NewClientModal setChangeIndicator={setChangeIndicator} />
        </div>}
      </div>
      <hr />
      <hr className='border-borderLine'/>
      <section className='px-6'>
        <ClientUserTable 
          changeIndicator={changeIndicator}
          columns={columns}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editingId={editingId}
          setEditingId={setEditingId}
          condition={condition}
          userRole={userRole}
        />
      </section>
    </main>
  )
}

export default ClientList