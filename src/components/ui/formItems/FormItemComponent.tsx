import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export function FormItemComponent({
    formLabel = '', 
    placeholderValue =  '',
    type = "text",
    name = "",
    form,
    formDescription = ""
}: FormItemComponentProps) {
    return (
        <FormField
          control={form.control}
          name= {name}
          render={({ field }) => (
                 <FormItem>
                    <FormLabel>{formLabel}</FormLabel>
                    <FormControl>
                        <Input  placeholder = {placeholderValue} type= {type} {...field}/>
                    </FormControl>
                    <FormDescription>
                        {formDescription}
                    </FormDescription>
                    <FormMessage />
                </FormItem>)}>
        </FormField>
    )
}

interface FormItemComponentProps {
    form: any; 
    formLabel?: string;
    placeholderValue?: string;
    type?: string;
    name: string;
    formDescription: string;
  }