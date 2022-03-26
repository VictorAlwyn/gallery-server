const add_gallery = {
  type: "object",
  required: ["title", "description"],
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
      minLength: 1,
    },
  },
};

const update_gallery = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    description: {
      type: "string",
      minLength: 1,
    },
  },
};

export default {
  add_gallery,
  update_gallery,
};
