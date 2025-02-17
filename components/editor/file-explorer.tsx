"use client";

import { useState, useEffect } from "react";
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
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  files: { [key: string]: string };
  selectedFile: string | null;
  onFileSelect: (file: string) => void;
  onFileCreate: (name: string, content: string) => void;
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

  // Load saved files from localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem("savedFiles");
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      Object.keys(parsedFiles).forEach((fileName) => {
        onFileCreate(fileName, parsedFiles[fileName]);
      });
    }
  }, [onFileCreate]);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("savedFiles", JSON.stringify(files));
    }, 5000);
    return () => clearInterval(interval);
  }, [files]);

  const handleCreateFile = () => {
    if (newFileName) {
      const extension = newFileName.split(".").pop();
      let content = "";
      
      // Provide default code snippets based on file type
      switch (extension) {
        case "html":
          content = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>New HTML File</title>\n</head>\n<body>\n<h1>Welcome to Your New HTML File</h1>\n<p>This is a basic HTML structure.</p>\n</body>\n</html>`;
          break;
        case "js":
          content = "console.log('Hello, World!');";
          break;
        case "css":
          content = "body {\n  font-family: Arial, sans-serif;\n}";
          break;
        case "py":
          content = "print('Hello, World!')";
          break;
        case "cpp":
          content = "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 'Hello, World!';\n    return 0;\n}";
          break;
        case "java":
          content = "public class Main {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}";
          break;
        case "ts":
          content = "console.log('Hello, TypeScript!');";
          break;
        default:
          content = "";
      }
      
      onFileCreate(newFileName, content);
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
                placeholder="(e.g. index.html)"
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