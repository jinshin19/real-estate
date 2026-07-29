export declare const UserGenderC: readonly ["male", "female"];
export declare const UserRoleSC: readonly ["client", "agent", "admin", "superadmin"];
export declare const RLUsersCN = "rl-users";
export declare class User {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string | null;
    readonly contactNumber?: string | null;
    readonly birthDate: string;
    readonly gender: UserGenderT;
    readonly email?: string | null;
    readonly role: UserRolesT;
    readonly photo?: string | null;
    readonly password?: string | null;
    readonly isDeleted: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, any, any, User>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, User, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    readonly _id?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly firstName?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly lastName?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly middleName?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly contactNumber?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly birthDate?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly gender?: import("mongoose").SchemaDefinitionProperty<"male" | "female", User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly email?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly role?: import("mongoose").SchemaDefinitionProperty<"superadmin" | "admin" | "agent" | "client", User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly photo?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly password?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly isDeleted?: import("mongoose").SchemaDefinitionProperty<boolean, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<User & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, User>;
export type UserGenderT = (typeof UserGenderC)[number];
export type UserRolesT = (typeof UserRoleSC)[number];
//# sourceMappingURL=user.schema.d.ts.map