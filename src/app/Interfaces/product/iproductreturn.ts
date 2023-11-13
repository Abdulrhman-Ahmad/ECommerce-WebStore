export interface Iproductreturn {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    priceAfter: number;
    condition: number;
    model: string;
    color: string;
    storage: number;
    ram: number;
    camera: string;
    cpu: string;
    screenSize: number;
    batteryCapacity: number;
    osVersion: string;
    categoryID: number;
    categoryName: string;
    brandID: number;
    brandName: string;
    warranties: {
        screen: string;
        battery: string;
    };
    images: string[];
    avgRating: number;
    avgRatingRounded: number;
}
