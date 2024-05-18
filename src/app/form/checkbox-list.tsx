"use client";

import React, { useEffect, useState } from "react";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { ListXIcon, ListChecksIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

import Button from "~/ui/buttons";

interface SelectControlledProps {
  list: string[];
  value: string[];
  onChange: (value: string[]) => void;
  title: string;
  className?: string;
  withSelectAll?: boolean;
}

export function SelectControlled({
  list = [],
  value,
  onChange,
  title,
  className = "",
  withSelectAll = false,
}: SelectControlledProps): JSX.Element {
  const selectAllState = value.length < list.length;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-1  px-2 text-center sm:px-0",
        className,
      )}
    >
      <MultiSelect
        className="input_shift min-w-0 "
        placeholder={title}
        placeholderSearch="جستجو..."
        defaultValue={[]}
        value={value}
        onValueChange={onChange}
      >
        {list.map((item) => {
          return (
            <MultiSelectItem
              className="flex justify-start gap-2"
              key={item}
              value={item}
            />
          );
        })}
      </MultiSelect>
      {withSelectAll && list.length > 0 && (
        // <TooltipProvider>
        //   <Tooltip>
        //     <TooltipTrigger>
        <Button
          className={cn(
            "font-bold",
            selectAllState
              ? "border border-primary/20 p-1.5 text-emerald-600 transition-all duration-300 hover:bg-emerald-50/20"
              : "border border-primary/20 bg-primary/10 p-1.5 text-rose-600 transition-all duration-300 hover:bg-primary/20",
          )}
          onClick={() => {
            if (value.length === list.length) {
              onChange([]);
            } else {
              onChange(list);
            }
          }}
        >
          {selectAllState ? <ListChecksIcon /> : <ListXIcon />}
        </Button>
        //    </TooltipTrigger>
        //     <TooltipContent className="bg-primary">
        //       {selectAllState ? "انتخاب همه" : "پاک کردن انتخاب ها"}
        //     </TooltipContent>
        //   </Tooltip>
        // </TooltipProvider>
      )}
    </div>
  );
}
