// src/models/UserModel.ts

export interface User {
  user_id?: number;
  referral_code: string;
  referred_by: string;
  username: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone_number: string;
  usertype_id: number;
}

// ใช้สำหรับ response จากการเข้าสู่ระบบ
export type Token = string;

export interface DataUserContext {
  user_id: number;
  email: string;
  usertype_id?: number;
}
export interface DataStoreContext {
  storeId: number;              // เปลี่ยน Int เป็น number
  logo?: string;                // เปลี่ยน String? เป็น string?
  storeName: string;            // เปลี่ยน String เป็น string
  status: number;               // เปลี่ยน Int เป็น number
}
