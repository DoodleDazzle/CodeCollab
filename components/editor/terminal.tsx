"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalProps {
  output: string;
}

export function Terminal({ output }: TerminalProps) {
  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-2 border-b">
        <h3 className="text-sm font-semibold">Output</h3>
      </div>
      <ScrollArea className="flex-1 p-2 font-mono text-sm">
        <div className="space-y-2">
          <div className="text-muted-foreground">
            Welcome to CodeCollab AI Terminal
          </div>
          {output && (
            <pre className="whitespace-pre-wrap break-words">
              {output}
            </pre>
          )}
          <div>$ _</div>
        </div>
      </ScrollArea>
    </div>
  );
}