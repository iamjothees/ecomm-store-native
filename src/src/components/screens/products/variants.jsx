import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { cn } from "@/lib/utils"; // Assuming cn is a utility for class concatenation
import { X, ChevronDown } from 'lucide-react'; // Importing Lucide React icons

function Variants({ product, selectedVariants, setSelectedVariants }) {
    const remainingVariantTypes = product.variants ? product.variants.filter(v => selectedVariants[v.name] === undefined).length : 0;
    const displayString = product.variants && product.variants.length > 0
        ? product.variants.map(v => selectedVariants[v.name]).filter(Boolean).join(' + ') || "Select Options"
        : "Select Options";

    const handleAddToCart = () => {
        // Implement add to cart logic here
        console.log("Added to cart from drawer confirm:", {
        product: product.name,
        ...selectedVariants, // Spread the selectedVariants object
        });
        // You would typically dispatch an action to a cart state management system here
    };

    return (
        <Drawer>
        <DrawerTrigger asChild>
            <Button
            variant="outline"
            className="w-full flex justify-between items-center px-4 py-3 rounded-lg shadow-sm text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
            {/* Wrap the content of the button in a single div */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">{displayString}</span>
                {remainingVariantTypes > 0 && (
                    <span className="text-sm text-muted-foreground">
                    and {remainingVariantTypes} more options available
                    </span>
                )}
                </div>
                <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            </Button>
        </DrawerTrigger>
            <ProductVariationsDrawerContent
            product={product}
            selectedVariants={selectedVariants}
            setSelectedVariants={setSelectedVariants}
            onConfirmSelection={handleAddToCart}
            />
        </Drawer>
    );
}

export default Variants;

// Component to encapsulate the content of the Product Variations Drawer
function ProductVariationsDrawerContent({
    product,
    selectedVariants,
    setSelectedVariants,
    onConfirmSelection,
}) {
    // Check if all variant types have a selected option for the confirmation button
    const areAllVariantsSelected = product.variants.every(variant => selectedVariants[variant.name] !== undefined);

    return (
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
            <VariantOptions
            key={variant.name} // Use variant name as key
            label={variant.name}
            options={variant.values}
            selectedOption={selectedVariants[variant.name]}
            onSelect={(value) => setSelectedVariants(prev => ({ ...prev, [variant.name]: value }))}
            />
        ))}
        {/* Product summary at the bottom of the drawer, as per image */}
        <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-lg font-bold text-foreground">{product.name}</p>
            <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₹{product.price}</span>
            {product.mrp > product.price && (
                <span className="line-through text-base text-muted-foreground">₹{product.mrp}</span>
            )}
            </div>
        </div>
        <DrawerFooter className="p-0 pt-4">
            <DrawerClose asChild>
                <Button
                className="w-full py-3 text-lg font-semibold rounded-lg"
                onClick={onConfirmSelection}
                disabled={!areAllVariantsSelected}
                >
                Confirm Selection
                </Button>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    );
}

// Component for selecting product variations
function VariantOptions({ label, options, selectedOption, onSelect }) {
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                <Badge
                    key={option}
                    variant={selectedOption === option ? "default" : "secondary"}
                    className={cn(
                    "cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 ease-in-out",
                    selectedOption === option ? "bg-primary text-primary-foreground shadow-md" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => onSelect(option)}
                >
                    {option}
                </Badge>
                ))}
            </div>
        </div>
    );
}