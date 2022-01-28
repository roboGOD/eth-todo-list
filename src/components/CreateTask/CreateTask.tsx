import React, { useState } from "react";

export default function CreateTask(
  { handleCreate } : { handleCreate: (content: string) => void }
) {
  const [content, setContent] = useState<string>('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      handleCreate(content);
    }}>
      <input
        id="newTask"
        type="text"
        className="form-control"
        placeholder="Add task..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        required={true}
      />
      <button type="submit" hidden />
    </form>
  );
}
