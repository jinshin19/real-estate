export declare const ReservationStatusC: readonly ["pending", "reserved", "cancelled", "expired", "completed"];
export declare const RLReservationsCN = "rl-reservations";
export declare class Reservation {
    readonly _id: string;
    reservationNo: string;
    propertyId: string;
    agentId: string;
    status: ReservationStatusT;
    reservationFee: number;
    reservedAt: string;
    expiresAt: string;
    remarks?: string | null;
    createdBy: string;
}
export declare const ReservationSchema: import("mongoose").Schema<Reservation, import("mongoose").Model<Reservation, any, any, any, any, any, Reservation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    readonly _id?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reservationNo?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    propertyId?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    agentId?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"reserved" | "pending" | "cancelled" | "expired" | "completed", Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reservationFee?: import("mongoose").SchemaDefinitionProperty<number, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reservedAt?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    remarks?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<string, Reservation, import("mongoose").Document<unknown, {}, Reservation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Reservation & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Reservation>;
export type ReservationStatusT = (typeof ReservationStatusC)[number];
//# sourceMappingURL=reservation.schema.d.ts.map