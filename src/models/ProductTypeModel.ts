export interface ProductTypeData {
    producttype_id?: number;
    producttype_name: string;
    producttype_image?: string;
    description?: string;
    submncondt?: number;
    storeId?: number;
  }

  export  interface ProductTypeDataList {
    producttype_id: number;
    storeId?: number;
    producttype_name: string;
    producttype_image?: string;
    description?: string;
    submncondt?: number;
  }