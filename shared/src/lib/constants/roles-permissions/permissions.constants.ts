export const PERMISSIONSC = {
  USERS: {
    get: "users.get",
    getById: "users.getById",
    updateById: "users.updateById",
    deleteByIds: "users.deleteByIds",
  },
  RESERVATIONS: {
    reservations: "reservations.reservations",
    getById: "reservations.getById",
    create: "reservations.create",
    updateById: "reservations.updateById",
    deleteByIds: "reservations.deleteByIds",
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
  USERS: Object.values(PERMISSIONSC.USERS),
  PROPERTIES: Object.values(PERMISSIONSC.PROPERTIES),
  RESERVATIONS: Object.values(PERMISSIONSC.RESERVATIONS),
};
