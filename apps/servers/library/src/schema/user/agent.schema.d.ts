export declare const RLAgentsCN = "rl-agents";
export declare class Agent {
    readonly _id: string;
    readonly userId: string;
    readonly managerId?: string | null;
    readonly branchId?: string | null;
    readonly hireDate: string | null;
}
export declare const AgentSchema: import("mongoose").Schema<Agent, import("mongoose").Model<Agent, any, any, any, any, any, Agent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Agent, import("mongoose").Document<unknown, {}, Agent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
    _id: string;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    readonly _id?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly userId?: import("mongoose").SchemaDefinitionProperty<string, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly managerId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly branchId?: import("mongoose").SchemaDefinitionProperty<string | null | undefined, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    readonly hireDate?: import("mongoose").SchemaDefinitionProperty<string | null, Agent, import("mongoose").Document<unknown, {}, Agent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Agent & Required<{
        _id: string;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Agent>;
//# sourceMappingURL=agent.schema.d.ts.map