// src/components/PromotionList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { handlePromotion } from "@/controllers/promotiosController";
import { Link } from "react-router-dom";
import { Promotions } from "@/models/PromotionModel";

const PromotionList: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("/api/promotions/selectbystore", {
          withCredentials: true,
        });
        setPromotions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setError("Failed to load promotions.");
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const handleDeltete = async (promo_id: number) => {
    try {
      handlePromotion(promo_id);
      setPromotions(promotions.filter((promo) => promo.promo_id !== promo_id));
      alert("Promotion deleted successfully.");
    } catch (error) {
      console.log("Failed to delete promotion.");
    }
  };

  if (loading) {
    return <p className="text-center">Loading promotions...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-500">Promotions List</h1>
        <Link
          to="/shop/PromotionForm"
          className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 transition"
        >
          +
        </Link>
      </div>
      <hr className="mb-[10px] " />

      <table className="table-auto w-full  ">
        <thead>
          <tr className=" text-[12px]">
          <th className=" px-4 py-2">ID</th>
            <th className=" px-4 py-2">Image</th>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className=" px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-[12px]">
          {promotions.map((promotion) => (
            <tr key={promotion.promo_id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {promotion.promo_id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {promotion.proimage ? (
                  <img
                    src={`/api/src/uploads/images/promotions/${promotion.proimage}`}
                    alt={promotion.promo_name}
                    className="w-10 h-10 object-cover mx-auto"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {promotion.promo_name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {promotion.promo_type}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {promotion.promo_dec}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {promotion.startdate}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {promotion.enddate}
              </td>
              <td className="border px-4 py-2">
                <Link
                  to={`/shop/PromotionEditForm/${promotion.promo_id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeltete(promotion.promo_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionList;
