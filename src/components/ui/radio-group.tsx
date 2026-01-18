import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import CheckIcon from '@/assets/icons/check-icon.svg?react';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'data-[state=checked]:[&>svg]:stroke-background-black bg-background-black data-[state=checked]:bg-primary text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 inline-flex cursor-pointer items-center justify-center rounded-2xl px-7 py-10 shadow-xs transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:stroke-[#444444]',
        className,
      )}
      {...props}
    >
      <CheckIcon className="size-4" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
