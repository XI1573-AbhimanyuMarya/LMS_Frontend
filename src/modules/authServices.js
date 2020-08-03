export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
  
    if (user?.login && user?.login?.jwt) {
      return { Authorization: 'Bearer ' + user.login.jwt };
    } else {
      return {};
    }
}
