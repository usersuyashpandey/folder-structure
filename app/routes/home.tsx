import type { Route } from "./+types/home";
import FolderStructureComponent from "~/components/FolderStructure";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Folder Structure" },
    { name: "description", content: "Folder Structure" },
  ];
}

export default function Home() {
  const jsonData = {
    Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    Desktop: ["Screenshot1.jpg", "videopal.mp4"],
    Downloads: {
      Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
      Applications: [
        "Webstorm.dmg",
        "Pycharm.dmg",
        "FileZila.dmg",
        "Mattermost.dmg",
      ],
      "chromedriver.dmg": [],
    },
  };

  return <FolderStructureComponent data={jsonData} />;
}
