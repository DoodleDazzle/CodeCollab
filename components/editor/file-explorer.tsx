"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  File,
  Folder,
  Plus,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  files: { [key: string]: string };
  selectedFile: string | null;
  onFileSelect: (file: string) => void;
  onFileCreate: (name: string) => void;
  onFileDelete: (name: string) => void;
}

export function FileExplorer({
  files,
  selectedFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
}: FileExplorerProps) {
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const handleCreateFile = () => {
    if (newFileName) {
      onFileCreate(newFileName.endsWith(".js") ? newFileName : `${newFileName}.js`);
      setNewFileName("");
      setIsCreatingFile(false);
    }
  };

  const handleDeleteFile = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFileToDelete(fileName);
  };

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-2 border-b flex items-center justify-between">
        <h2 className="text-sm font-semibold">Explorer</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCreatingFile(true)}
          title="New File"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {isCreatingFile && (
            <div className="flex items-center space-x-2 mb-2">
              <Input
                size={1}
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateFile();
                  if (e.key === "Escape") setIsCreatingFile(false);
                }}
                placeholder="filename.js"
                autoFocus
              />
            </div>
          )}

          {Object.keys(files).map((fileName) => (
            <div
              key={fileName}
              className={cn(
                "group flex items-center space-x-2 px-2 py-1 rounded-md cursor-pointer hover:bg-accent",
                selectedFile === fileName && "bg-accent"
              )}
              onClick={() => onFileSelect(fileName)}
            >
              <File className="h-4 w-4" />
              <span className="text-sm flex-1">{fileName}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDeleteFile(fileName, e)}
                title="Delete File"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{fileToDelete}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (fileToDelete) {
                  onFileDelete(fileToDelete);
                  setFileToDelete(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}