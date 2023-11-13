export interface Iproductadd {
    name: string;
    description: string;
    price: number;
    condition: number;
    stockQuantity: number;
    discount: number;
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
    brandID: number;
    warranties: Warranty[];
    images: Image[];
}
export interface Warranty {
    partName: string;
    duration: string;
}
export interface Image {
    imageUrl: string ;
}

