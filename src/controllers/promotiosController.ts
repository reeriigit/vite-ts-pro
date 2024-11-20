import { deletePromotionById } from "@/services/promotionsService";
export const handlePromotion = async(promo_id: number) =>{
    try{
        const response = await deletePromotionById(promo_id);
        return response;

    }catch(error){
        console.error('Faill to deleteprom promotion');
        throw error
    }
}