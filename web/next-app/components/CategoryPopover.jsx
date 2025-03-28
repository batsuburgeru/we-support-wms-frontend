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

export default function CategoryPopover({ value, setValue }) {
    const [open, setOpen] = React.useState(false)
    const [clients, setClients] = React.useState([]);
      
    React.useEffect(() => {
      fetch("http://localhost:3002/users/view-users", {
          method: 'GET',
          credentials: 'include'
      })
      .then(response => response.json())
      .then(result => {
          if (result && result.users) {
          setClients(result.users);
          } else {
          console.log('Retrieve failed:', result.message);
          }
      })
      .catch(error => {
          console.log('Error:', error);
      });
    }, []);
    
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
                  ? clients.find((client) => client.id === value)?.name
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
                        key={client.id}
                        value={client.id}
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
                            value === client.id ? "opacity-100" : "opacity-0"
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