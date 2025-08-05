import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

function CartItemVariantSelector({ product, initialSelectedVariants, onVariantChange, children }) {
    const [selectedVariants, setSelectedVariants] = useState(initialSelectedVariants);

    const handleSelectVariant = (variantName, value) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variantName]: value
        }));
    };

    const handleConfirmSelection = () => {
        onVariantChange(selectedVariants);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="p-4 !pt-0 space-y-4 rounded-t-xl mb-16">
                <div className="flex justify-between items-center">
                    <DrawerTitle className="text-xl font-semibold">Select Options</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </DrawerClose>
                </div>
                {product.variants && product.variants.map(variant => (
                    <div key={variant.name}>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{variant.name}</p>
                        <div className="flex flex-wrap gap-2">
                            {variant.values.map(value => (
                                <Badge
                                    key={value}
                                    variant={selectedVariants[variant.name] === value ? "default" : "secondary"}
                                    className={cn(
                                        "cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 ease-in-out",
                                        selectedVariants[variant.name] === value ? "bg-primary text-primary-foreground shadow-md" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    )}
                                    onClick={() => handleSelectVariant(variant.name, value)}
                                >
                                    {value}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
                <DrawerFooter className="p-0 pt-4">
                    <DrawerClose asChild>
                        <Button
                            className="w-full py-3 text-lg font-semibold rounded-lg"
                            onClick={handleConfirmSelection}
                        >
                            Confirm Selection
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default CartItemVariantSelector;
