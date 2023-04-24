import React from 'react';
import { Link } from 'react-router-dom';
import { IResourceComponentsProps } from "@refinedev/core";


interface Category {
  _id: string;
  name: string;
}

interface CategoryListProps extends IResourceComponentsProps<any, any> {
    categories: Category[];
  }

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
