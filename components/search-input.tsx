"use client";
import qs from "query-string";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const name = searchParams.get("name");

    const [value, setValue] = useState(name || "");
    // use-debounce.ts - make the sytem debounce, dont wanna query with every charater, only query after substational char are typed.
    const debouncedValue = useDebounce<string>(value, 500); // search only when finished typing from the user
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipEmptyString: true, skipNull: true});

        router.push(url);
    }, [debouncedValue, router, categoryId]);

    return (  
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"/>
            <Input 
                onChange={onChange}
                value={value}
                placeholder="Search..."
                className="pl-10 bg-primary/10"
            />
        </div>        
    );
}