// types.ts

export interface CarData {
  attributes: {
    title: string;
    description: string;
    price: number;
    image: {
      data: [
        {
          attributes: {
            url: string;
          }
        }
      ]
    };
    latitude?: number;
    longitude?: number;
    store?: string;
    storeLocation?: {
      latitude: number;
      longitude: number;
      storeName: string;
    };
  };
}

export interface Dealer {
  id: number;
  attributes: {
    title: string;
    latitude: number;
    longitude: number;
  };
}
