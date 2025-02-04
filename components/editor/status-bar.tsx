export function StatusBar() {
  return (
    <div className="h-6 border-t flex items-center px-2 text-xs text-muted-foreground">
      <div className="flex-1">Ready</div>
      <div>JavaScript</div>
    </div>
  );
}