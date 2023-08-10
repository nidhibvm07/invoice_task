import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const initialForm = {
  productname: "",
  qty: "",
  price: "",
  amount: "",
};

const ModalComponent = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("productData")) || []
  );
  //handelInput
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  
  //handelSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...form, id: new Date().getTime().toString() };
    console.log("newData", newData);
    setRecords([...records, newData]);
    setForm(initialForm);
  };

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(records));
  }, [records]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Panel>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg p-6  w-[40%]">
            <h3 className="text-xl font-semibold mb-4">Product Form</h3>
            <form>
              <label
                htmlFor="productname"
                className="block text-sm font-medium"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productname"
                name="productname"
                value={form.productname}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                placeholder="Product Name"
                onChange={handleInput}
              />
              <div className="">
                <label htmlFor="qty" className="block text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="text"
                  id="qty"
                  name="qty"
                  value={form.qty}
                  className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                  placeholder="Quantity"
                  onChange={handleInput}
                />
              </div>
              <div className="">
                <label htmlFor="price" className="block text-sm font-medium">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={form.price}
                  className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200"
                  placeholder="Price"
                  onChange={handleInput}
                />
              </div>
            </form>
            
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ModalComponent;
