'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CacheEntry = {
    data: { items: Item[]; total: number };
    timestamp: number;
}

type Item = {
    id: number;
    name: string;
    [key: string]: any;
}

type Props = {
    value?: number | null;
    onValueChange: (value: number | undefined) => void;
    loadItems: (page: number, size: number, search?: string) => Promise<{ items: Item[], total: number }>;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    label?: string;
    disabled?: boolean;
    className?: string;
    itemsPerPage?: number;
}

const SelectList = ({
                        value,
                        onValueChange,
                        loadItems,
                        placeholder = "Select an item...",
                        searchPlaceholder = "Search...",
                        emptyText = "No item found",
                        label,
                        disabled = false,
                        className = "",
                        itemsPerPage = 10
                    }: Props) => {
    const cacheRef = useRef<Map<string, CacheEntry>>(new Map());
    const cacheDuration = 60 * 1000; // 1 minute cache

    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState<Item[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // Generate a cache key based on page and search query
    const cacheKey = useMemo(() => `${currentPage}-${debouncedSearchQuery}`, [currentPage, debouncedSearchQuery]);

    // Fetch items when open, search changes, or page changes
    useEffect(() => {
        const fetchItems = async () => {
            // check cache first
            const cached = cacheRef.current.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < cacheDuration) {
                setItems(cached.data.items);
                setTotalItems(cached.data.total);
                return;
            }

            // fetch from API
            setLoading(true);
            try {
                const data = await loadItems(currentPage, itemsPerPage, debouncedSearchQuery);
                setItems(data.items || []);
                setTotalItems(data.total || 0);

                // store in cache
                cacheRef.current.set(cacheKey, {data, timestamp: Date.now()});
            } catch (error) {
                console.error("Error loading items:", error);
                setItems([]);
                setTotalItems(0);
            } finally {
                setLoading(false);
            }
        };

        if (open) fetchItems();
    }, [cacheKey, currentPage, itemsPerPage, debouncedSearchQuery, open, loadItems]);

    // Load selected item whenever value changes
    useEffect(() => {
        const loadSelectedItem = async () => {
            if (value !== undefined && value !== null) {
                // check cache
                for (const [, entry] of cacheRef.current) {
                    const found = entry.data.items.find(i => i.id === value);
                    if (found) {
                        setSelectedItem(found);
                        return;
                    }
                }

                // fetch if not in cache
                setLoading(true);
                try {
                    const data = await loadItems(1, 25, '');
                    const foundItem = data.items.find(i => i.id === value);
                    setSelectedItem(foundItem || null);
                } catch {
                    setSelectedItem(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setSelectedItem(null); // reset placeholder
            }
        };

        loadSelectedItem();
    }, [value, loadItems]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSelect = (item: Item) => {
        const newValue = item.id === value ? undefined : Number(item.id);
        onValueChange(newValue);
        setSelectedItem(newValue ? item : null);
        setOpen(false);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <Label>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn('border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4', className)}
                        disabled={disabled || loading}
                    >
                        {loading ? "Loading..." : selectedItem?.name ?? placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                    <div className="flex flex-col">
                        {/* Search Input */}
                        <div className="flex items-center border-b px-3 py-2">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="h-8 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>

                        {/* Items List */}
                        <div className="max-h-80 overflow-y-auto p-1">
                            {loading ? (
                                <div className="py-6 text-center text-sm">Loading...</div>
                            ) : items.length > 0 ? (
                                items.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleSelect(item)}
                                        className="flex w-full items-center justify-start px-2 py-2 text-sm gap-2"
                                    >
                                        <Check
                                            className={`h-4 w-4 flex-shrink-0 ${
                                                value === item.id ? "opacity-100" : "opacity-0"
                                            }`}
                                        />
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium">{item.name}</span>
                                            {item.description && (
                                                <span className="text-xs text-muted-foreground">
              {item.description}
            </span>
                                            )}
                                        </div>
                                    </Button>
                                ))
                            ) : (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    {emptyText}
                                </div>
                            )}
                        </div>


                        {/* Pagination */}
                        {!loading && totalItems > itemsPerPage && (
                            <div className="flex items-center justify-between border-t px-3 py-2">
                                <div className="text-xs">Page {currentPage} of {totalPages} ({totalItems} total)</div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentPage(p => Math.max(1, p - 1))
                                        }}
                                        disabled={currentPage === 1}
                                        className="h-7 px-2 text-xs"
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentPage(p => Math.min(totalPages, p + 1))
                                        }}
                                        disabled={currentPage === totalPages}
                                        className="h-7 px-2 text-xs"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default SelectList;
