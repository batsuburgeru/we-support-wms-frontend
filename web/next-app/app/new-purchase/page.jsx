"use client"

import * as React from "react"
import DropdownMenu from "../../components/DropdownMenu"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const clients = [
  {
    value: "johndoe",
    name: "John Doe",
    email: "john.doe@gmail.com",
  },
  {
    value: "michaelreed",
    name: "Michael Reed",
    email: "michael.reed@gmail.com",
  }
]

const NewPurchase = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [moreToggle, setMoreToggle] = React.useState(false)

  function toggleMenu() {
    setMoreToggle(prevState => !prevState)
  }

  return (
    <main>
      <div className='flex items-center px-6 py-4'>
        <img src="./cart.png" className='h-12 mr-2' />
        <h1>New Purchase Requisition</h1>
      </div>
      <section className="px-6">
        <div className="flex items-center">
          <h2 className="mr-20">Client Name*</h2>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-96 justify-between border-borderLine active:border-brand-primary"
              >
                {value
                  ? clients.find((client) => client.value === value)?.name
                  : "Select a client"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
              <Command>
                <CommandInput placeholder="Select a client" className="h-9" />
                <CommandList>
                  <CommandEmpty>No client found.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((client) => (
                      <CommandItem
                        key={client.value}
                        value={client.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg">{client.name}</span>
                          <span className="font-light text-sm">{client.email}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            value === client.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-11">Purchase Order #</h2>
          <input type="number" placeholder="Order Number" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-[102px]">Request #</h2>
          <input type="number" placeholder="Request Number" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>

        <div className="flex items-center mt-4">
          <h2 className="mr-[147px]">Date</h2>
          <input type="text" placeholder="February 21, 2025" className='border border-borderLine rounded-md px-4 py-1 w-80' />
        </div>
      </section>

      <section className="px-6 mt-8">
        <div className="bg-navBG border border-borderLine rounded-tl-lg rounded-tr-lg px-8 py-2">
          <h2 className="font-semibold text-lg">Item Table</h2>
        </div>
        <table className="w-full">
          <tbody>
            <tr className="border-b-2 border-borderLine">
              <th className="font-medium border-r">ITEM DETAILS</th>
              <th className="font-medium border-r">QUANTITY</th>
              <th className="font-medium border-r">UNIT</th>
              <th className="font-medium border-r">ESTIMATED COST</th>
              <th className="font-medium">AMOUNT COST</th>
              <th className="font-medium"></th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <DropdownMenu />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <DropdownMenu />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <DropdownMenu />
              </th>
            </tr>
            <tr className="border-b border-borderLine">
              <th className="font-normal border-r flex items-center"><img src="./img-box.png" className="w-6 mr-1" />Laptop</th>
              <th className="font-normal border-r"><input type="number" placeholder="1"></input></th>
              <th className="font-normal border-r">Pcs</th>
              <th className="font-normal border-r">₱5.00</th>
              <th className="font-normal">₱50.00</th>
              <th className="font-normal flex justify-end pr-0">
                <DropdownMenu />
              </th>
            </tr>
          </tbody>
        </table>
        <button className="bg-navBG rounded-md px-3 py-1 flex justify-center items-center mt-4 hover:bg-neutral-200 colorTransition">
          <img src="./add-row.png" className="w-6" />
          Add New Row
        </button>
      </section>
      <section className="px-6 mt-8 flex justify-between mb-24">
        <div>
          <h2 className="font-medium">Notes</h2>
          <textarea className="border border-borderLine rounded-md px-4 py-2 h-40 w-96 resize-none" />
        </div>
        <div className="bg-navBG flex flex-col justify-between p-6 rounded-md ml-8 w-[500px] min-w-96">
          <div className="flex justify-between">
            <div>
              <p className="font-medium mb-2">Sub Total</p>
              <p className="font-medium text-sm">Total Quantity: 15</p>
            </div>
            <p className="font-medium">
              ₱110.00
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h2 className="font-semibold">Total</h2>
            <h2 className="font-semibold">₱110.00</h2>
          </div>
        </div>
      </section>
      <section className="w-full fixed bottom-0 px-6 bg-white py-3 shadow-[0_-5px_10px_rgba(0,0,0,0.10)] z-50">
        <button className="bg-buttonBG px-4 py-2 rounded-md">
          Save as Draft
        </button>
        <button className="ml-4 bg-brand-primary text-white px-4 py-2 rounded-md">
          Get Approval
        </button>
        <button className="ml-4 bg-buttonBG px-4 py-2 rounded-md">
          Cancel
        </button>
      </section>
    </main>
  )
}

export default NewPurchase