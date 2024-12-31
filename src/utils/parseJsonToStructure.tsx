import type { FileSystemItem } from "../types";

export const parseJsonToStructure = (jsonData: any): FileSystemItem[] => {
  if (Array.isArray(jsonData)) {
    return jsonData
      .map((item) => {
        if (typeof item === "string") {
          return { type: "file", name: item };
        } else if (typeof item === "object" && item !== null) {
          const key = Object.keys(item)[0];
          return {
            type: "folder",
            name: key,
            children: parseJsonToStructure(item[key]),
          };
        }
        return null;
      })
      .filter((item) => item !== null) as FileSystemItem[];
  } else if (typeof jsonData === "object" && jsonData !== null) {
    return Object.keys(jsonData).map((key) => ({
      type: "folder",
      name: key,
      children: parseJsonToStructure(jsonData[key]),
    }));
  }
  return [{ type: "file", name: jsonData }];
};
