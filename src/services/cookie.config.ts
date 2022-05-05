import Cookies from 'js-cookie';

export const BASE_URL = process.env.REACT_APP_SERVER_URL + "/graphql";

class Auth {
  getCipher(): string | null {
    return Cookies.get("calorie-tracker-user-cipher") || null;
  }

  setCipher(token: string): void {
    Cookies.set("calorie-tracker-user-cipher", token, { expires: 1 }); // expire 24 hours
  }

  clearCipher(): void {
    Cookies.remove("calorie-tracker-user-cipher");
  }
}

export default new Auth();
