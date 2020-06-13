import axios from "axios";

// 프록시 서버랑 연결하는 api
const api = axios.create({
	// 실행할 때 마다 확인을 좀 해줘야함
	baseURL: "http://192.168.200.140:4000",
});

export const getDb = () => api.get("/database");

export const createDb = () => api.get("/database/create");

export const createUser = () => api.get("/user/create", { params: { user_id: 1 } });

export const getUser = () => api.get("/user/get", { params: { user_id: 1 } });
