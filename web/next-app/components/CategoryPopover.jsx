"use category"

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
    const [categories, setCategories] = React.useState([]);
      
    React.useEffect(() => {
      fetch("http://localhost:3002/categories/view-categories", {
          method: 'GET',
          credentials: 'include'
      })
      .then(response => response.json())
      .then(result => {
          if (result && result.categories) {
          setCategories(result.categories);
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
                  ? categories.find((category) => category.id === value)?.name
                  : "Select a category"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
              <Command>
                <CommandInput placeholder="Select a category" className="h-9" />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg">{category.name}</span>
                          <span className="font-light text-sm text-ellipsis overflow-hidden txtOverflowPopover">{category.description}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            value === category.id ? "opacity-100" : "opacity-0"
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