"use client";

import { SetStateAction, useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setage] = useState("");


  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };

  const handleInputChangeage = (e: { target: { value: SetStateAction<string>; }; }) => {
    setage(e.target.value);
  };

  const loadTemplate = async () => {
    const response = await fetch("/template.docx");
    if (!response.ok) {
      throw new Error("Failed to load template");
    }
    return await response.arrayBuffer();
  };

  const generateDocument = async () => {
    try {
      const templateContent = await loadTemplate();
      const zip = new PizZip(templateContent);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({ name,age });

      doc.render();

      const docxBlob = new Blob([doc.getZip().generate({ type: "arraybuffer" })], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      return docxBlob;
    } catch (error) {
      console.error("Error generating document:", error);
      throw error;
    }
  };

  const handleDownload = async () => {
    try {
      const docxBlob = await generateDocument();
      saveAs(docxBlob, "output.docx");
    } catch (error) {
      console.error("Error during download process:", error);
    }
  };

  return (
    <div>
      <h1>PDF Creation</h1>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Enter your name"
        style={{ "color": "black" }}
      />

      <input
        type="text"
        name="age"
        id="age"
        value={age}
        onChange={handleInputChangeage}
        placeholder="Enter your age"
        style={{ "color": "black" }}
      />

      <button onClick={handleDownload}>Create DOCX</button>
    </div>
  );
}
