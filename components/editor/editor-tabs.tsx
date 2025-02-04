"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorTabsProps {
  files: string[];
  selectedFile: string | null;
  onSelect: (file: string) => void;
}

export function EditorTabs({ files, selectedFile, onSelect }: EditorTabsProps) {
  return (
    <ScrollArea className="border-b">
      <div className="flex">
        {files.map((file) => (
          <Button
            key={file}
            variant="ghost"
            className={cn(
              "h-9 px-4 py-2 rounded-none border-r",
              selectedFile === file && "bg-accent"
            )}
            onClick={() => onSelect(file)}
          >
            <span className="text-sm">{file}</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}