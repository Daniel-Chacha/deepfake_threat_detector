export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-accent animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground">Loading admin dashboard...</p>
      </div>
    </div>
  );
}
