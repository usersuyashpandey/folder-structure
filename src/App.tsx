import "./App.css";
import FolderStructure from "./components/FolderStructure";

function App() {
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
  return (
    <>
      <FolderStructure data={jsonData} />
    </>
  );
}

export default App;
