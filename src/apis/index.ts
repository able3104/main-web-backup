import defaultApiClient from "./instance/defaultApiClient";

interface SearchAgenciesRequest {
  phoneName: string;
  phoneBrand: string;
  telecom: string;
  canChangeTelecom: boolean;
}

export interface AgencyInfo {
  agencyId: number;
  agencyName: string;
  agencyRating: number;

  telecom: string;
  subscriptionType: string;

  phoneBrand: string;
  phoneName: string;
  phonePrice: number;

  authTag: boolean;
}

interface SearchAgenciesResponse {
  agency: AgencyInfo[];
}

export const searchAgenciesApi = async (data: SearchAgenciesRequest) => {
  try {
    const res = await defaultApiClient.post<SearchAgenciesResponse>(
      "/user/searchAgencies",
      data,
    );
    return res.data;
  } catch (error) {
    console.error("Error in searchAgenciesApi:", error);
    throw error;
  }
};

interface AgencyDetailRequest {
  agencyId: number;
  phoneBrand: string;
  phoneName: string;
  telecom: string;
  subscriptionType: string;
}

export interface AgencyDetailResponse {
  agencyId: number;
  agencyName: string;
  agencyRating: number;
  agencyAddress: string;
  agencyPhoneNumber: string;

  phoneName: string;
  phoneBrand: string;
  phonePrice: number;
  phoneOriginalPrice: number;
  phoneImage: string;

  startTime: string;
  endTime: string;
  agencyLatitude: number;
  agencyLongitude: number;

  telecom: string;
}

export const getAgencyDetail = async (data: AgencyDetailRequest) => {
  try {
    const res = await defaultApiClient.post<AgencyDetailResponse>(
      "/user/getAgencyDetail",
      data,
    );
    return res.data;
  } catch (error) {
    console.error("Error in getAgencyDetail:", error);
    throw error;
  }
};

export const getSubsidy = async (telecom: string) => {
  try {
    const res = await defaultApiClient.get<{ subsidyValue: number }>(
      `/user/getSubsidy?telecom=${telecom}`,
    );
    return res.data.subsidyValue;
  } catch (error) {
    console.error("Error in getSubsidy:", error);
    throw error;
  }
};
