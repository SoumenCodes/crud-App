import React from "react";
import { Link } from "react-router-dom";

// import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductTable = ({ data, deleteProduct }) => {
  return (
    <>
      <Card
        sx={{
          minWidth: 345,
          maxWidth: 600,
          bgcolor: "#111827",
          color: "white",
          margin: "1rem",
          padding: "4px",
        }}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={data.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {"$"}
            {data.price}
          </Typography>
          <Typography variant="body2" color="text">
            {data.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#4f46e5", color: "white" }}
          >
            <Link to={`../product/${data.id}`}>Details</Link>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#4f46e5", color: "white" }}
          >
            <Link to={`../products/${data.id}/edit`}> Edit</Link>
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => deleteProduct(data.id)}
            sx={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {/* <div className="flex flex-row mt-5">
        <div className="flex-1 w-[100px]">
          <img src={data.image} className="w-full w-[100px]" />
        </div>
        <h3 className="flex-1">{data.name}</h3>
        <div className="flex-1">
          <Link>
            <button
              className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
              to={`../products/${data.id}`}
            >
              Details
            </button>
          </Link>
          <Link
            className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            to={`../products/${data.id}/edit`}
          >
            Edit
          </Link>
          <button
            className="inline-block px-12 py-3 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            onClick={() => deleteProduct(data.id)}
          >
            Delete
          </button>
        </div>
      </div> */}
    </>
  );
};

export default ProductTable;
