import React, { useState } from "react";
import api from "@/services/api.service";
import { useAuth } from "@/providers/user.context";
import { LogIn } from "lucide-react";
import Login from "./Login";
import { useToast } from "@/components/ui/use-toast";

function AddBusinessForm() {
  const { toast } = useToast();
  const { loggedInUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  async function createBusiness(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!loggedInUser) {
      toast({
        description: "Can not add business as a guest, please log in.",
        variant: "destructive",
      });
      setIsLoginOpen(true);

      return;
    }
    const formData = new FormData(ev.currentTarget);
    try {
      const response = await api.post("/business", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        description: "Business Created Successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        description: "Error Creating Business. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Business
          </h2>
          <form onSubmit={createBusiness}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                placeholder="Image"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </>
  );
}

export default AddBusinessForm;
