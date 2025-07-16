import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"

const SearchBar = ({placeholder = "Search", onChange = null, value="" }) => {
    const formSchema = z.object({
      searchTerm: z.string(),
    });
    
    const form = useForm({
        mode: onChange ? "onChange" : "onSubmit",
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchTerm: value,
        },
    });

    const handleOnChange = (searchTerm) => {
        if (!onChange) return;
        if (!searchTerm) return;

        onChange(searchTerm);
    };

    return (
        <>
            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="searchTerm"
                        render={( { field } ) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder={placeholder} 
                                        {...field} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleOnChange(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {field.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    )
};

export default SearchBar;