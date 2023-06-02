import { faker } from "@faker-js/faker";


export const createFakeProduct = () => {
    return {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(5),
      price: faker.commerce.price(),
      status: faker.datatype.boolean(0.9),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [
        faker.image.urlPlaceholder({ format: "jpeg" }),
        faker.image.urlPlaceholder({ format: "jpeg" }),
        faker.image.urlPlaceholder({ format: "jpeg" }),
      ],
    };
  };
  
  export const createFakePass = () => {
    return faker.string.alphanumeric(8);
  }