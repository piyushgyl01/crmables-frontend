import { useEffect } from "react";
import { fetchComments, selectComments } from "../leadSlice";
import { useDispatch, useSelector } from "react-redux";
import useLead from "./useLead";

export default function useComments() {
  const dispatch = useDispatch();
  const { leadID } = useLead();
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(leadID));
  }, [dispatch, leadID]);

  return comments;
}
