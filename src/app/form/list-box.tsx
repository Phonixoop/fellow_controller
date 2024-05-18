"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type Input = {
  label: string;
  value: string;
};
export function ComboboxDemo({
  values = [],
  list = [],
  onChange = (value) => {},
  placeHolder = "",
  rest,
}: {
  values: Input[];
  list: Input[];
  onChange?: (value: any) => unknown;
  placeHolder?: string;
  rest?: any;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-secbuttn text-accent "
        >
          {values.length > 0 ? values.map((item) => item.label) : placeHolder}
          <ChevronsUpDown className="mr-0 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-secondary p-0 text-primary">
        <Command>
          <CommandInput
            className="mr-2 text-accent"
            placeholder={placeHolder}
          />
          <CommandEmpty>پیدا نشد</CommandEmpty>
          <CommandGroup>
            {list.map((item) => (
              <CommandItem
                className="bg-secondary text-primary hover:bg-primbuttn hover:text-secbuttn aria-selected:bg-primbuttn aria-selected:text-secbuttn"
                key={item.value}
                onSelect={(currentValue) => {
                  const v = values.find(
                    (item) => item.label === currentValue,
                  )?.value;
                  onChange(v);

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "ml-2 h-4 w-4 stroke-accent text-primbuttn",
                    values.map((a) => a.value).includes(item.value)
                      ? " opacity-100"
                      : "opacity-0",
                  )}
                />

                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
