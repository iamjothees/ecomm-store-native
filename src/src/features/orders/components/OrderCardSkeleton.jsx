import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const OrderCardSkeleton = () => {
  return (
    <Card className="overflow-hidden pt-2">
      <CardHeader className="relative">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-5 w-20 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <section>
          <main className="flex flex-col">
            {[...Array(2)].map((_, j) => (
              <section key={j} className={cn("flex flex-col gap-2 pb-3 border-b border-gray-300 mb-3", { "border-b-2 border-gray-400": j === 1 })}>
                <main className="flex gap-2">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </main>
                <footer className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </footer>
              </section>
            ))}
          </main>
          <footer className="flex flex-row-reverse justify-between">
            <Skeleton className="h-4 w-24" />
          </footer>
        </section>
      </CardContent>
    </Card>
  );
};

export default OrderCardSkeleton;
