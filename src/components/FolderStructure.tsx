import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import type { FileSystemItem, FolderStructureProps, IFolder } from "../types";
import { parseJsonToStructure } from "../utils/parseJsonToStructure";
import { getFileIcon } from "../utils/getFileIcon";

const FolderStructure: React.FC<FolderStructureProps> = ({ data }) => {
  const [structure, setStructure] = useState<FileSystemItem[]>([]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [newItemType, setNewItemType] = useState<"file" | "folder">("file");
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    if (data) {
      setStructure(parseJsonToStructure(data));
    }
  }, [data]);

  const handleAdd = (type: "file" | "folder", name: string) => {
    if (!name.trim()) return;

    const newItem: FileSystemItem =
      type === "folder"
        ? { type: "folder", name, children: [] }
        : { type: "file", name };

    setStructure((prev) => {
      const newStructure = [...prev];
      let current = newStructure;

      for (const pathPart of currentPath) {
        const folder = current.find(
          (item): item is IFolder =>
            item.type === "folder" && item.name === pathPart
        );
        if (!folder) return prev;
        current = folder.children;
      }

      if (current.some((item) => item.name === name)) return prev;

      current.push(newItem);
      return newStructure;
    });

    setShowAddModal(false);
  };

  const handleDelete = (path: string[]) => {
    if (path.length === 0) return;

    setStructure((prev) => {
      const newStructure = [...prev];
      let current = newStructure;

      for (let i = 0; i < path.length - 1; i++) {
        const folder = current.find(
          (item): item is IFolder =>
            item.type === "folder" && item.name === path[i]
        );
        if (!folder) return prev;
        current = folder.children;
      }

      const deleteIndex = current.findIndex(
        (item) => item.name === path[path.length - 1]
      );
      if (deleteIndex !== -1) {
        current.splice(deleteIndex, 1);
      }

      return newStructure;
    });
  };

  const handleEdit = (path: string[], newName: string) => {
    if (!newName.trim() || path.length === 0) return;

    setStructure((prev) => {
      const newStructure = [...prev];
      let current = newStructure;

      for (let i = 0; i < path.length - 1; i++) {
        const folder = current.find(
          (item): item is IFolder =>
            item.type === "folder" && item.name === path[i]
        );
        if (!folder) return prev;
        current = folder.children;
      }

      const item = current.find((item) => item.name === path[path.length - 1]);
      if (item) {
        item.name = newName;
      }

      return newStructure;
    });

    setEditing(null);
  };

  const renderItem = (item: FileSystemItem, path: string[]) => {
    const isFolder = item.type === "folder";
    const fullPath = path.join("/");
    const isExpanded = expanded.has(fullPath);

    return (
      <div key={fullPath} className="ml-4">
        <div className="flex items-center gap-2 py-1 hover:bg-gray-100 rounded">
          {isFolder && (
            <button
              onClick={() => {
                const newExpanded = new Set(expanded);
                if (isExpanded) {
                  newExpanded.delete(fullPath);
                } else {
                  newExpanded.add(fullPath);
                }
                setExpanded(newExpanded);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}

          {isFolder ? (
            <Folder size={16} className="text-blue-500" />
          ) : (
            getFileIcon(item.name)
          )}

          {editing === fullPath ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleEdit(path, editValue)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleEdit(path, editValue)
              }
              className="px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <span>{item.name}</span>
          )}

          <div className="ml-auto flex gap-2">
            {isFolder && (
              <button
                onClick={() => {
                  setCurrentPath(path);
                  setShowAddModal(true);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Plus size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setEditing(fullPath);
                setEditValue(item.name);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => handleDelete(path)}
              className="p-1 hover:bg-gray-200 rounded text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {isFolder && isExpanded && (
          <div className="ml-4">
            {(item as IFolder).children.map((child) =>
              renderItem(child, [...path, child.name])
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">File Explorer</h2>
          <button
            onClick={() => {
              setCurrentPath([]);
              setShowAddModal(true);
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Root Item
          </button>
        </div>

        {structure.map((item) => renderItem(item, [item.name]))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Add New Item{" "}
              {currentPath.length > 0 && `to /${currentPath.join("/")}`}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newItemType}
                  onChange={(e) =>
                    setNewItemType(e.target.value as "file" | "folder")
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="file">File</option>
                  <option value="folder">Folder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter name"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newItemName.trim()) {
                      handleAdd(newItemType, newItemName.trim());
                      setNewItemType("file");
                      setNewItemName("");
                    }
                  }}
                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    !newItemName.trim() && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!newItemName.trim()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderStructure;
