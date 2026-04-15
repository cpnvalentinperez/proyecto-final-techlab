import * as ProductModel from '../models/products.model.js';

export const fetchAllProducts = async () => {
    return await ProductModel.getAll();
};

export const fetchProductById = async (id) => {
    return await ProductModel.getById(id);
};

export const saveProduct = async (productData) => {
    return await ProductModel.create(productData);
};

export const deleteProduct = async (id) => {
    return await ProductModel.remove(id);
};
