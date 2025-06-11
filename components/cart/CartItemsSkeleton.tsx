export default function CartItemsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border rounded-lg">
          <div className="w-20 h-20 bg-muted animate-pulse rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            <div className="flex justify-between items-center">
              <div className="h-8 bg-muted animate-pulse rounded w-24" />
              <div className="h-4 bg-muted animate-pulse rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
