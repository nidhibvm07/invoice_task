import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


const initialForm = {
  name: "",
  description: "",
  date: "",
  productRows: [
    {
      productname: "",
      qty: "",
      price: "",
      id: new Date().getTime().toString(),
    },
  ],
};

const InvoiceForm = () => {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("invoiceData")) || []
  );

  const handleInput = (e, rowIndex, fieldName) => {
    const { value } = e.target;
    const updatedProductRows = [...form.productRows];
    updatedProductRows[rowIndex][fieldName] = value;

    setForm((prevForm) => ({
      ...prevForm,
      productRows: updatedProductRows,
    }));
  };

  const resetbutton = () => {
    setForm({
      ...initialForm,
      productRows: [
        {
          productname: "",
          qty: "",
          price: "",
          id: new Date().getTime().toString(),
        },
      ],
    });
  };

  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...form};
    setRecords([...records, newData]);
  };
  

  const addNewRow = () => {
    const newRow = {
      productname: "",
      qty: "",
      price: "",
      id: new Date().getTime().toString(),
    };
  
    setForm((prevForm) => ({
      ...prevForm,
      productRows: [...prevForm.productRows, newRow],
    }));
  };
  


  const handelData = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(records));
  }, [records]);

  //total calculator
  const calculateTotal = () => {
    let amount = 0;
    form.productRows.forEach((row) => {
      amount += row.qty * row.price;
    });
    return amount;
  };

  //delete row
  const deleteRow = (id) => {
   
    const updatedProductRows = form.productRows.filter(row => row.id !== id);
    setForm(prevForm => ({
      ...prevForm,
      productRows: updatedProductRows,
    }));
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">New Invoice</h2>
        <form className="p-6 border-2 border-black rounded-lg  space-y-4">
          <div className="w-full">
            <label
              htmlFor="productname"
              className="float-left text-sm font-medium"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              className="w-full px-3 py-2 border  focus:ring focus:ring-blue-200 border-black rounded-lg"
              onChange={handelData}
            />
          </div>
          <div className=" flex space-x-4">
            <div className="w-96">
              <label
                htmlFor="productname"
                className="float-left text-sm font-medium"
              >
                Customer Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={form.description}
                className="w-full px-3 py-2 border border-black rounded-lg focus:ring focus:ring-blue-200"
                onChange={handelData}
              />
            </div>
            <div className="w-96">
              <label
                htmlFor="productname"
                className="float-left text-sm font-medium"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                className="w-full px-3 py-2 border border-black rounded-lg focus:ring focus:ring-blue-200"
                onChange={handelData}
              />
            </div>
          </div>

          <hr className="my-4" />
         

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {form?.productRows?.map((row, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <input
                        type="text"
                        name="productname"
                        value={row.productname}
                        className="w-full px-3 py-2 border border-black rounded-lg focus:ring focus:ring-blue-200"
                        placeholder="Product Name"
                        onChange={(e) => handleInput(e, index, "productname")}
                      />
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="qty"
                        min='1'
                        value={row.qty}
                        className="w-full px-3 py-2 border border-black rounded-lg focus:ring focus:ring-blue-200"
                        placeholder="Quantity"
                        onChange={(e) => handleInput(e, index, "qty")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="price"
                        value={row.price}
                        className="w-full px-3 py-2 border border-black rounded-lg focus:ring focus:ring-blue-200"
                        placeholder="Price"
                        onChange={(e) => handleInput(e, index, "price")}
                      />
                    </td>
                    <td>
                      <input
                        value={row.price * row.qty}
                        className="w-full px-3 py-2  "
                        disabled
                        onChange={(e) => handleInput(e, index, "price")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <FaTrash
                        className="cursor-pointer text-red-500 text-lg"
                        onClick={() => deleteRow(row.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-400 px-3 py-1 text-lg  rounded shadow border-2 border-gray font-bold"
              onClick={addNewRow}
            >
              Add Row
            </button>
          </div>
          <hr />
          <div className="flex justify-end">
            <h1 className="font-bold text-lg">Total</h1>
            <h1 className="px-12 font-bold text-lg mr-44">{calculateTotal()}</h1>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="bg-green-300 px-12 py-1 text-lg shadow border-2 border-gray font-bold"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="reset"
              className="bg-red-300 px-12 py-1 text-lg shadow border-2 border-gray font-bold"
              onClick={resetbutton}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
