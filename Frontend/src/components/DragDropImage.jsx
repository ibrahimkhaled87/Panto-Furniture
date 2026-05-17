import { useRef, useState } from "react";

export default function DragDropImage({image, setImage}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return <div className="dragDropImage" >
    {image         
      ? <div className="dropped">
          <img src={URL.createObjectURL(image)} alt="" /> 
          <p onClick={() => setImage(null)}>&times;</p>
      </div>
      : <div className="pending"
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={() => handleDragLeave()}
        onDrop={(e) => handleDrop(e)}
        onClick={() => fileInputRef.current.click()}
        style={{
          backgroundColor: isDragging ? "#f0f0f0" : "transparent",
          borderColor: isDragging ? "#333" : "#aaa",
          cursor: "pointer",
        }}
      >
        {isDragging ? "Drop image here" : "Drag & Drop Image Or click to browse"}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleBrowse} hidden />

      </div>
    }
  </div>
}