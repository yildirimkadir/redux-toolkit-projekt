import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import loadingGif from "../assets/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import { clearNewsList, getNews } from "../features/newsSlice";
import { useEffect } from "react";
import { useState } from "react";

const News = () => {
  const dispatch = useDispatch();
  const { newsList, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
    return () => {
      dispatch(clearNewsList());
    };
  }, [dispatch]);
  return (
    <>
      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <img src={loadingGif} alt="gif" width="90%" height="800px" />
        </Box>
      )}
      {!loading && (
        <Box
          xs={{ d: "flex" }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {newsList?.map((item, index) => {
            const {
              title,
              abstract,
              url,
              image = item.media.map((x) => x["media-metadata"][1]["url"]),
            } = item;
            console.log(image[0]);
            return (
              <>
                <Card sx={{ maxWidth: 345, m: 5, maxHeight: 600 }} key={index}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={image[0]}
                    alt="img"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {abstract}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small" href={url} target="_blank">
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default News;
