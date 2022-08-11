import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  newsList: [],
  loading: true,
};

const API_KEY = process.env.REACT_APP_apiKey;

export const getNews = createAsyncThunk("news/getNews", async () => {
  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
  try {
    const { data } = await axios(url);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: {
    [getNews.pending]: (state, action) => {
      state.loading = true;
    },
    [getNews.fulfilled]: (state, action) => {
      state.loading = false;
      state.newsList = action.payload;
    },
    [getNews.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
