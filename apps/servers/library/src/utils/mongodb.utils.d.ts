declare const PaginationSortByC: readonly ["asc", "desc"];
export declare const RemoveRootIdU: () => ({
    $addFields: {
        id: string;
    };
    $project?: undefined;
} | {
    $project: {
        _id: number;
    };
    $addFields?: undefined;
})[];
export declare const AddRemoveRootIdU: (payload: any) => any;
export declare const PaginationU: (page?: number | string, limit?: number | string, sortField?: string, sortBy?: PaginationSortByT) => ({
    $sort: {
        [x: string]: 1 | -1;
    };
    $facet?: undefined;
    $addFields?: undefined;
} | {
    $facet: {
        items: ({
            $skip: number;
            $limit?: undefined;
        } | {
            $limit: number;
            $skip?: undefined;
        })[];
    };
    $sort?: undefined;
    $addFields?: undefined;
} | {
    $addFields: {
        metadata: {
            page: number;
            limit: number;
        };
    };
    $sort?: undefined;
    $facet?: undefined;
})[];
type PaginationSortByT = (typeof PaginationSortByC)[number];
export {};
//# sourceMappingURL=mongodb.utils.d.ts.map