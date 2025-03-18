export const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiPaths = {
  //auth
  login: "/auth/login",
  refreshToken: "/auth/refreshToken",
  registerByInvite: "/auth/register/byInvite",
  registerByAdmin: "/auth/register/byAdmin",
  //users
  getCurrent: "/users/me",
  createInvite: "/users/createInvite",
  //tasks
  createTask: "/tasks/",
  getTask: "/tasks/:id",
  updateTask: "/tasks/:id",
  deleteTask: "/tasks/:id",
};

export class ApiPaths {
  static login() {
    return apiPaths.login;
  }

  static refreshToken() {
    return apiPaths.refreshToken;
  }

  //User
  static getCurrentUser() {
    return apiPaths.getCurrent;
  }

  static createTask() {
    return apiPaths.createTask;
  }
  static getTask(id: number) {
    return this.formatPath(apiPaths.getTask, id);
  }
  static updateTask(id: number) {
    return this.formatPath(apiPaths.updateTask, id);
  }
  static deleteTask(id: number) {
    return this.formatPath(apiPaths.deleteTask, id);
  }

  private static formatPath(path: string, id: number) {
    return path.replace(":id", String(id));
  }
}
