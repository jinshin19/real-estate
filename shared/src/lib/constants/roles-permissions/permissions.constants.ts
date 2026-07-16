export const PERMISSIONSC = {
  USERS: {
    get: "users.get",
    getById: "users.getById",
    updateById: "users.updateById",
    deleteByIds: "users.deleteByIds",
  },
  PROPERTIES: {
    properties: "properties.properties",
    getById: "properties.getById",
    create: "properties.create",
    updateById: "properties.updateById",
    deleteByIds: "properties.deleteByIds",
  },
};

export const EXTRACTEDPERMISSIONSC = {
  PROPERTIES: Object.values(PERMISSIONSC.PROPERTIES),
};
