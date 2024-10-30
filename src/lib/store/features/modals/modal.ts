import { createSlice } from '@reduxjs/toolkit';

interface InitialStateT {
  Component: any;
  isOpen: boolean;
  props?: any;
}

const initialState: InitialStateT[] = [];

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, actions) => {
      return [
        ...state,
        {
          Component: actions.payload.Component,
          isOpen: true,
          props: actions.payload.props,
        },
      ];
    },
    close: () => {
      return [];
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
