import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import bikesListAPI from "../../../services/bikes-list/bikes-list.api";
import { RootState } from "../../../app/store/store";
import { Bike } from "../models/bike.model";

export interface BikesListState {
  data: Bike[];
  isLoading: boolean;
}

const initialState: BikesListState = {
  data: [],
  isLoading: false,
};

export const getBikes = createAsyncThunk("getBikes", async (_, thunkAPI) => {
  try {
    const response = await bikesListAPI.getBikes();

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const bikesListSlice = createSlice({
  name: "bikes-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBikes.fulfilled,
      (state, action: PayloadAction<Bike[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );

    builder.addCase(getBikes.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBikes.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectBikesList = (state: RootState) => state.bikesList.data;
export const selectBikesLoading = (state: RootState) =>
  state.bikesList.isLoading;

export default bikesListSlice.reducer;
