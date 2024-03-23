import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, query, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");
  const productQuery = {};
  if (categories) {
    productQuery.category = categories.split(",");
  }
  if (query) {
    productQuery["$or"] = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productQuery["properties." + filterName] = filters[filterName];
    });
  }
  res.json(
    await Product.find(productQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
