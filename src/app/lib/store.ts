import Cookies from 'js-cookie';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {devtools} from 'zustand/middleware';



const cookieStorage = {
  getItem: (name: string) => Cookies.get(name),
  setItem: (name: string, value: string) =>
    Cookies.set(name, value, {expires: 7, path: '/'}),
  removeItem: (name: string) => Cookies.remove(name),
};
