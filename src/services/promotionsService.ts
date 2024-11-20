import axios from "axios"

export const deletePromotionById = async (promo_id:number) => {
await axios.delete(`/api/promotions/delete/${promo_id}`)
}