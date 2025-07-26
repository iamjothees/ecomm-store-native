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
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useRef } from "react";

const SearchBar = ({placeholder = "Search", onChange = null, value="", debounce = 500 }) => {
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

    const debouncer = useRef(null);

    const handleOnChange = (searchTerm) => {
        if (!onChange) return;

        if (debouncer.current) clearTimeout(debouncer.current);
        debouncer.current = setTimeout(() => {
            onChange(searchTerm || "");
        }, debounce);
    };

    const handleClearSearch = () => {
        form.setValue("searchTerm", "");
        handleOnChange("");
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
                                    <div className="relative">
                                        <Search className="h-5 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input 
                                            placeholder={placeholder} 
                                            {...field} 
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleOnChange(e.target.value);
                                            }}
                                            className="placeholder:text-sm ps-10 focus:border-primary focus-visible:ring-0"
                                        />
                                        {field.value && (
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground hover:bg-gray-100"
                                            onClick={handleClearSearch}
                                            >
                                            <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
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