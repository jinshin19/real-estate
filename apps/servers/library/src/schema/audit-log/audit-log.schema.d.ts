export declare const AuditLogActionsC: readonly ["create", "update", "delete"];
export declare const RLAuditLogsCN = "rl-audit-logs";
export declare class AuditLogs {
    readonly _id: string;
    userId: string;
    collectionId: string;
    collectionName: string;
    action: AuditLogActionsT;
    field: string;
    oldValue?: string | null;
    newValue?: string | null;
    userAgent: string;
}
export declare const AuditLogsSchema: import("mongoose").Schema<AuditLogs, import("mongoose").Model<AuditLogs, any, any, any, any, any, AuditLogs>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    readonly _id?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    collectionId?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    collectionName?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    action?: import("mongoose").SchemaDefinitionProperty<"create" | "update" | "delete", AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    field?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    oldValue?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    newValue?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userAgent?: import("mongoose").SchemaDefinitionProperty<string, AuditLogs, import("mongoose").Document<unknown, {}, AuditLogs, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLogs & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AuditLogs>;
export type AuditLogActionsT = (typeof AuditLogActionsC)[number];
//# sourceMappingURL=audit-log.schema.d.ts.map