"use client"

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export default function ClientPopover() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-96 justify-between border-borderLine"
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
    )
}