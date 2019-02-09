export const log = function(output) {
  if(process.env.NODE_ENV === "development") {
    console.log(output);
  }
}
