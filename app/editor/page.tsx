"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { FileExplorer } from "@/components/editor/file-explorer";
import { EditorTabs } from "@/components/editor/editor-tabs";
import { Terminal } from "@/components/editor/terminal";
import { MenuBar } from "@/components/editor/menu-bar";
import { StatusBar } from "@/components/editor/status-bar";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function EditorPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [key: string]: string }>({
    "index.js": "// Start coding here\nconsole.log('Hello, CodeCollab AI!');\n",
  });
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      localStorage.setItem("editor_files", JSON.stringify(files));
    }
  }, [files]);

  useEffect(() => {
    const savedFiles = localStorage.getItem("editor_files");
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleRunCode = async () => {
    if (!selectedFile) return;

    setIsRunning(true);
    setOutput("");

    try {
      const code = files[selectedFile];
      let result = "";

      if (selectedFile.endsWith(".js")) {
        result = await new Promise((resolve) => {
          const output: string[] = [];
          const consoleLog = console.log;
          console.log = (...args) => output.push(args.join(" "));
          try {
            eval(code);
            resolve(output.join("\n"));
          } catch (error: any) {
            resolve(`Error: ${error.message}`);
          } finally {
            console.log = consoleLog;
          }
        });
      } else if (selectedFile.endsWith(".html")) {
        const newWindow = window.open("", "_blank");
        newWindow?.document.write(code);
        newWindow?.document.close();
        result = "HTML executed in a new tab.";
      } else {
        result = "Unsupported file type.";
      }

      setOutput(result);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleFileCreate = (name: string) => {
    if (files[name]) {
      let count = 1;
      let newName = name;
      while (files[newName]) {
        newName = `${name.split(".")[0]}_${count}.${name.split(".")[1]}`;
        count++;
      }
      name = newName;
    }
    setFiles((prev) => ({ ...prev, [name]: "" }));
    setSelectedFile(name);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <MenuBar />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onFileCreate={handleFileCreate}
            onFileDelete={(name) => {
              setFiles((prev) => {
                const newFiles = { ...prev };
                delete newFiles[name];
                return newFiles;
              });
              if (selectedFile === name) {
                setSelectedFile(Object.keys(files)[0] || null);
              }
            }}
          />
        </ResizablePanel>

        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <EditorTabs
              files={Object.keys(files)}
              selectedFile={selectedFile}
              onSelect={setSelectedFile}
            />
            <div className="flex-1">
              {selectedFile && (
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={files[selectedFile]}
                  onChange={(value) => {
                    if (value && selectedFile) {
                      setFiles((prev) => ({ ...prev, [selectedFile]: value }));
                    }
                  }}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    fontFamily: "var(--font-jetbrains)",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    autoClosingBrackets: "always",
                  }}
                />
              )}
            </div>
            <div className="p-2 border-t flex justify-center">
              <Button
                onClick={handleRunCode}
                disabled={!selectedFile || isRunning}
                className="w-32"
              >
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
        </ResizablePanel>

        <ResizablePanel defaultSize={20} minSize={15}>
          <Terminal output={output} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <StatusBar />
    </div>
  );
}
