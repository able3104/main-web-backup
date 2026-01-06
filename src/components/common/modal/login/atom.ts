import { atom } from "jotai";

interface LoginModalAtom {
  isOpen: boolean;
  subtitle: string;
  title: string;
  afterFunction: () => void;
}

const loginModalAtom = atom<LoginModalAtom>({
  isOpen: false,
  subtitle: "",
  title: "",
  afterFunction: () => {},
});

const loginModalOpenAtom = atom(
  (get) => get(loginModalAtom).isOpen,
  (_, set, payload: Omit<LoginModalAtom, "isOpen">) => {
    set(loginModalAtom, { isOpen: true, ...payload });
  }
);

export { loginModalAtom, loginModalOpenAtom };
