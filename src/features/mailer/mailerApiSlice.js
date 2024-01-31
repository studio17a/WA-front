import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const mailAdapter = createEntityAdapter({});
const initialState = mailAdapter.getInitialState();

export const mailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: ({ task, body }) => ({
        url: "/mail",
        method: task === "new" ? "POST" : "DELETE",
        body: {
          ...body,
        },
      }),
    }),
  }),
});
export const { useSendEmailMutation } = mailApiSlice;
