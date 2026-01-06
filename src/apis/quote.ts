import authApiClient from "./instance/authApiClient";
import defaultApiClient from "./instance/defaultApiClient";

interface RegisterQuoteRequest {
  agencyId: number;
  phoneBrand: string;
  phoneName: string;
  phonePrice: number;
  phonePlan: {
    name: string;
    price: number;
  };
  discount: {
    name: string;
    price: number;
  }[];
  subscriptionType: string;
  telecom: string;
  customerName: string;
}

interface RegisterQuoteResponse {
  quoteCode: string;
}

export const registerQuoteApi = async (data: RegisterQuoteRequest) => {
  try {
    const res = await authApiClient.post<RegisterQuoteResponse>(
      "/user/registerQuote",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error in registerQuoteApi:", error);
    throw error;
  }
};

export interface GetQuoteResponse {
  customerName: string;
  agencyName: string;
  agencyRating: number;
  agencyAddress: string;
  agencyPhoneNumber: string;
  phoneBrand: string;
  phoneName: string;
  phonePrice: number;
  phoneOriginalPrice: number;
  phoneImage: string;
  telecom: string;
  authTag: boolean;
  phonePlan: {
    name: string;
    price: number;
  };
  discount: {
    name: string;
    price: number;
  };
  subscriptionType: string;
  benefits: string[];
}

export const getQuoteApi = async (quoteCode: string) => {
  try {
    const res = await defaultApiClient.get<GetQuoteResponse>(
      `/user/getQuote?quoteCode=${quoteCode}`
    );
    return res.data;
  } catch (error) {
    console.error("Error in getQuoteApi:", error);
    throw error;
  }
};
