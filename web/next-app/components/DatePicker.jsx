"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker({ date, setDate }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "sm:w-[240px] w-48 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
      <Calendar 
        mode="single" 
        selected={date} 
        onSelect={(selectedDate) => {
          if (selectedDate) {
            const formattedDate = format(selectedDate, "P"); // Format date before updating state
            setDate(formattedDate); // Update state with formatted date
          }
        }} 
        initialFocus 
      />
      </PopoverContent>
    </Popover>
  );
}
