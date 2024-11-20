export interface PromotionData {
    promo_name: string;
    promo_type: number;
    promo_dec: string;
    amountuse: number;
    amountgiven: number;
    valuegiven_id: number;
    amountcon: number;
    valuecon_id: number;
    startdate: string;
    enddate: string;
    thtime: number;
    proimage?: string | null; // Store the filename or null
  }

  export interface Promotions {
    promo_id: number;
    proimage: string;
    promo_name: string;
    promo_type: number;
    promo_dec: string;
    amountuse: number;
    amountgiven: number;
    startdate: string;
    enddate: string;
  }
  
  // To use an array of Promotion objects

  