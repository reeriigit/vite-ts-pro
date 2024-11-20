import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PromotionData } from "@/models/PromotionModel";

const PromotionEditForm: React.FC = () => {
  const navigate = useNavigate();
  const { promo_id } = useParams<{ promo_id: string }>();
  const [promotionData, setPromotionData] = useState<PromotionData>({
    promo_name: "",
    promo_type: 0,
    promo_dec: "",
    amountuse: 0,
    amountgiven: 0,
    valuegiven_id: 0,
    amountcon: 0,
    valuecon_id: 0,
    startdate: "",
    enddate: "",
    thtime: 1,
    proimage: null,
  });
  const [promotionImage, setPromotionImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(`/api/promotions/select/${promo_id}`, {
          withCredentials: true,
        });
  
        const promotion = response.data.data[0];
        setPromotionData({
          ...promotion,
          proimage: promotion.proimage || null,
        });
      } catch (error) {
        console.error("Error fetching promotion data:", error);
        setMessage("Failed to fetch promotion data.");
      }
    };

    fetchPromotion();
  }, [promo_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPromotionData((prevData) => ({
      ...prevData,
      [name]: ["promo_type", "amountuse", "amountgiven", "valuegiven_id", "amountcon", "valuecon_id", "thtime"].includes(
        name
      )
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPromotionImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("promo_name", promotionData.promo_name);
    formData.append("promo_type", String(promotionData.promo_type));
    formData.append("promo_dec", promotionData.promo_dec);
    formData.append("amountuse", String(promotionData.amountuse));
    formData.append("amountgiven", String(promotionData.amountgiven));
    formData.append("valuegiven_id", String(promotionData.valuegiven_id));
    formData.append("amountcon", String(promotionData.amountcon));
    formData.append("valuecon_id", String(promotionData.valuecon_id));
    formData.append("startdate", promotionData.startdate);
    formData.append("enddate", promotionData.enddate);
    formData.append("thtime", String(promotionData.thtime));
    if (promotionImage) {
      formData.append("proimage", promotionImage); // Add the image file
    }

    try {
      await axios.put(`/api/promotions/update/${promo_id}`, formData, {
        withCredentials: true,
      });
      setMessage("Promotion updated successfully!");
      navigate("/shop/promotionslist");
    } catch (error) {
      console.error("Error updating promotion:", error);
      setMessage("Failed to update promotion.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Update Promotion{promo_id}</h2>
      {message && (
        <p
          className={`mb-4 text-center font-semibold ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Promotion Name</label>
        <input
          type="text"
          name="promo_name"
          value={promotionData.promo_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Promotion Type</label>
        <input
          type="number"
          name="promo_type"
          value={promotionData.promo_type}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Promotion Description</label>
        <textarea
          name="promo_dec"
          value={promotionData.promo_dec}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Promotion Image</label>
        <input
          type="file"
          name="proimage"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
        {promotionData.proimage && (
          <p className="mt-2 text-sm text-gray-500">
            Current file: {promotionData.proimage}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Start Date</label>
        <input
          type="date"
          name="startdate"
          value={promotionData.startdate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">End Date</label>
        <input
          type="date"
          name="enddate"
          value={promotionData.enddate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Update Promotion
      </button>
    </form>
  );
};

export default PromotionEditForm;
