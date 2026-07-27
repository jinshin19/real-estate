const PaginationSortByC = ["asc", "desc"] as const;

export const RemoveRootIdU = () => {
  return [
    {
      $addFields: {
        id: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];
};

export const AddRemoveRootIdU = (payload: any) => {
  payload.id = payload._id;
  delete payload?._id;
  return payload;
};

export const PaginationU = (
  page: number | string = 1,
  limit: number | string = 25,
  sortField: string = "createdAt",
  sortBy: PaginationSortByT = "asc",
) => {
  const modifiedPage = typeof page === "string" ? Number(page) : page;
  const modifiedLimit = typeof limit === "string" ? Number(limit) : limit;
  const modifiedSort = {
    asc: 1 as const,
    desc: -1 as const,
  };

  return [
    {
      $sort: {
        [sortField as string]: modifiedSort[sortBy],
      },
    },
    {
      $facet: {
        items: [
          {
            $skip: (modifiedPage - 1) * modifiedLimit,
          },
          {
            $limit: modifiedLimit,
          },
        ],
      },
    },
    {
      $addFields: {
        metadata: {
          page: modifiedPage,
          limit: modifiedLimit,
        },
      },
    },
  ];
};

type PaginationSortByT = (typeof PaginationSortByC)[number];
