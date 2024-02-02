import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../slice/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => dispatch(setProducts(response.data)))
      .catch((error) => console.error(error));
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Best Products of the Market
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "1rem",
              justifyContent: "center",
            }}
          >
            {products.map((product) => (
              <Card
                sx={{
                  minWidth: 345,
                  maxWidth: 600,
                  bgcolor: "#111827",
                  color: "white",
                  margin: "1rem",
                  padding: "4px",
                }}
                key={product?.id}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {"$"} {product.price}
                  </Typography>
                  <Typography variant="body2" color="text">
                    {product.brand}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#4f46e5", color: "white" }}
                  >
                    <Link to={`../product/${product.id}`}>Details</Link>
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
