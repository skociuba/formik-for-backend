import Cookies from 'js-cookie';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {devtools} from 'zustand/middleware';

import {useTodoStore} from './../(pages)/zustand/store';
import {useZustandStore} from './../components/ZustandPageComponents/store';

const cookieStorage = {
  getItem: (name: string) => Cookies.get(name),
  setItem: (name: string, value: string) =>
    Cookies.set(name, value, {expires: 7, path: '/'}),
  removeItem: (name: string) => Cookies.remove(name),
};

export const useAppStore = create<any>()(
  devtools(
    persist(
      (...a) => ({
        ...useTodoStore(...a),
        ...useZustandStore(...a),
      }),
      {name: 'mera-store', getStorage: () => cookieStorage},
    ),
  ),
);
