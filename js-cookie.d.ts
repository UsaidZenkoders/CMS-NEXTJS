declare module 'js-cookie' {
    interface CookieAttributes {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'strict' | 'lax' | 'none';
      [property: string]: any;
    }
  
    interface CookiesStatic<T = string> {
      get(name: string): T | undefined;
      get(): { [key: string]: T };
      set(name: string, value: string | object, options?: CookieAttributes): CookiesStatic<T>;
      remove(name: string, options?: CookieAttributes): void;
    }
  
    const Cookies: CookiesStatic;
    export default Cookies;
  }
  