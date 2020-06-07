import axios from "axios";

// 프록시 서버랑 연결하는 api
const api = axios.create({
  // 실행할 때 마다 확인을 좀 해줘야함
  baseURL: "http://172.25.1.37:4000/api"
});

export const getUsers = postId =>
  api.get("users", { params: { id: `${postId}` } });

export const postUser = (id, password, username, question, answer) =>
  api.post("login/signup", {
    id: `${id}`,
    password: `${password}`,
    name: `${username}`,
    question: `${question}`,
    answer: `${answer}`
  });
export const postCounter = (id, _id, setNum, amount) =>
  api.post("exercise", {
    id: id,
    _id: _id,
    setNum: setNum,
    amount: amount
  });

export const getCounter = id =>
  api.get("/exercise/get", { params: { id: id } });
