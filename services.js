import http from "./api/intercept";

class APIServices {
  getAll(url) {
    return http.get(`/${url}`);
  }

  get(url, id) {
    return http.get(`/${url}/${id}`);
  }

  get(url) {
    return http.get(`/${url}`);
  }

  get(url, data) {
    return http.get(`/${url}`, data);
  }

  getUser(url) {
    return http.get(`/${url}`);
  }

  create(url, data) {
    return http.post(`/${url}`, data);
  }

  createPost(url) {
    return http.post(`/${url}`);
  }

  createPoints(url) {
    return http.post(`/${url}`, data);
  }

  update(url, id, data) {
    return http.put(`/${url}/${id}`, data);
  }

  updateUser(url, data) {
    return http.put(`/${url}`, data);
  }

  delete(url, id) {
    return http.delete(`/${url}/${id}`);
  }

  deleteAll() {
    return http.delete(`/${url}`);
  }

  deleteUser(url, id) {
    return http.put(`/${url}/${id}`);
  }
  deletePut(url) {
    return http.put(`/${url}`);
  }
}

export default new APIServices();
