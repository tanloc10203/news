import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLoginM } from '../../models';
import { RootState } from './../../app/store';

export interface PostState {
  title: string;
  contenHtml: string;
  imgTitle: string;
  imgTitlePost: string;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

const initialState: PostState = {
  title: '',
  contenHtml: '',
  imgTitle: '',
  imgTitlePost: '',
  category_id: '',
  created_at: '',
  updated_at: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
});

export const selectAuth = (state: RootState) => state.post;
export const {} = postSlice.actions;
export default postSlice.reducer;
