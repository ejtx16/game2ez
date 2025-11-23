export default function GameDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="h-10 w-24 bg-zinc-800 rounded-lg mb-6 animate-pulse"></div>

        <div className="mb-8 animate-pulse">
          <div className="h-9 w-48 bg-zinc-800 rounded mb-4"></div>
          <div className="h-5 w-64 bg-zinc-800 rounded mb-2"></div>
          <div className="h-4 w-40 bg-zinc-800 rounded"></div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 mb-8 animate-pulse">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                <div className="h-8 w-48 bg-zinc-800 rounded"></div>
                <div className="h-5 w-16 bg-zinc-800 rounded"></div>
              </div>
              <div className="h-20 w-32 bg-zinc-800 rounded"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                <div className="h-8 w-48 bg-zinc-800 rounded"></div>
                <div className="h-5 w-16 bg-zinc-800 rounded"></div>
              </div>
              <div className="h-20 w-32 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8 animate-pulse">
          <div className="h-7 w-48 bg-zinc-800 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 w-full bg-zinc-800 rounded"></div>
            <div className="h-12 w-full bg-zinc-800 rounded"></div>
            <div className="h-12 w-full bg-zinc-800 rounded"></div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
          <div className="h-7 w-48 bg-zinc-800 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-zinc-800 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-zinc-800 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-zinc-800 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
