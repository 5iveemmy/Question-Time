export const token =
  typeof window !== "undefined" && window.localStorage.getItem("token");
export const questionId =
  typeof window !== "undefined" && window.localStorage.getItem("questionId");
