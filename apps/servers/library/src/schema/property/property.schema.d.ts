export declare const PropertyStatusC: readonly ["sold", "reserved", "available", "unavailable"];
export declare const RLPropertiesCN = "rl-properties";
export declare class Property {
    readonly _id: string;
    readonly title: string;
    readonly description?: string | null;
    readonly projectId: string;
    readonly houseModelId: string;
    readonly price: number;
    readonly reservationFee: number;
    readonly status: PropertyStatusT;
    readonly isFeatured: boolean;
    readonly isPublished: boolean;
    readonly location: PropertyLocationI;
    readonly images: string[];
    readonly features: string;
    readonly specifications: PropertySpecficationI;
    readonly createdBy: string;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, any, any, Property>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, import("mongoose").Document<unknown, {}, Property, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    readonly _id?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly title?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly description?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly projectId?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly houseModelId?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly price?: import("mongoose").SchemaDefinitionProperty<number, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly reservationFee?: import("mongoose").SchemaDefinitionProperty<number, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly status?: import("mongoose").SchemaDefinitionProperty<"sold" | "reserved" | "available" | "unavailable", Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly isFeatured?: import("mongoose").SchemaDefinitionProperty<boolean, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly location?: import("mongoose").SchemaDefinitionProperty<PropertyLocationI, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly images?: import("mongoose").SchemaDefinitionProperty<string[], Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly features?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly specifications?: import("mongoose").SchemaDefinitionProperty<PropertySpecficationI, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly createdBy?: import("mongoose").SchemaDefinitionProperty<string, Property, import("mongoose").Document<unknown, {}, Property, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Property & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Property>;
export interface PropertyLocationI {
    country: string;
    province?: string | null;
    city?: string | null;
    barangay?: string | null;
    street: string;
    zipCode: string;
    block?: string | null;
    lot?: string | null;
    latitude?: string | null;
    longitude?: string | null;
}
export interface PropertySpecficationI {
    lotArea: string;
    floodArea: string;
    bedrooms: number;
    garageSlot: number;
    floors: number;
}
export type PropertyStatusT = (typeof PropertyStatusC)[number];
//# sourceMappingURL=property.schema.d.ts.map