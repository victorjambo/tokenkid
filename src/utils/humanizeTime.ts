import moment from "moment";

export const humanizeTime = (timestamp: number | string) => {
  const date = new Date(+timestamp * 1000);

  return moment(date).fromNow();
};
