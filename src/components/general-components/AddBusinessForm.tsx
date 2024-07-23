import React from "react";
import api from "@/services/api.service";

function AddBusinessForm() {
  async function createBusiness(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    try {
      const response = await api.post("/business", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Business created successfully:", response.data);
    } catch (error) {
      console.error("Error creating business:", error);
    }
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={createBusiness}>
        <input type="text" name="name" placeholder="name" required />
        <input type="text" name="category" placeholder="category" required />
        <input
          type="text"
          name="description"
          placeholder="description"
          required
        />
        <input type="file" name="image" placeholder="image" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBusinessForm;
