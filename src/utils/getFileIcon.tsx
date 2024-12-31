import {
  AudioLines,
  Code,
  File,
  FileArchive,
  FileImage,
  FileJson2,
  FileText,
  FileVideo,
  PlayCircle,
  Presentation,
  Table2,
} from "lucide-react";

export const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "txt":
    case "md":
    case "rtf":
    case "log":
      return <FileText size={16} className="text-gray-500" />;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
    case "svg":
    case "webp":
    case "ico":
      return <FileImage size={16} className="text-green-500" />;

    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "wmv":
    case "flv":
      return <FileVideo size={16} className="text-purple-500" />;

    case "mp3":
    case "wav":
    case "ogg":
    case "flac":
    case "aac":
      return <AudioLines size={16} className="text-blue-400" />;

    case "zip":
    case "rar":
    case "tar":
    case "gz":
    case "7z":
    case "bz2":
      return <FileArchive size={16} className="text-yellow-500" />;

    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "py":
    case "java":
    case "cpp":
    case "c":
    case "html":
    case "css":
    case "php":
    case "go":
    case "swift":
    case "kt":
      return <Code size={16} className="text-blue-500" />;

    case "json":
      return <FileJson2 size={16} className="text-orange-500" />;
    case "pdf":
      return <FileText size={16} className="text-red-500" />;
    case "csv":
    case "xls":
    case "xlsx":
      return <Table2 size={16} className="text-green-600" />;
    case "ppt":
    case "pptx":
      return <Presentation size={16} className="text-orange-700" />;

    case "exe":
    case "msi":
    case "apk":
    case "dmg":
      return <PlayCircle size={16} className="text-gray-600" />;

    default:
      return <File size={16} className="text-gray-500 opacity-50" />;
  }
};
