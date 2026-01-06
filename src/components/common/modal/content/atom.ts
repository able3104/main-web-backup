import { atom } from "jotai";

interface ContentModalAtom {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description: string;
  footer: React.ReactNode;
}

const contentModalAtom = atom<ContentModalAtom>({
  isOpen: false,
  imageUrl: "",
  title: "",
  description: "",
  footer: null,
});

const contentModalOpenAtom = atom(
  (get) => get(contentModalAtom).isOpen,
  (_, set, payload: Omit<ContentModalAtom, "isOpen">) => {
    set(contentModalAtom, {
      isOpen: true,
      ...payload,
    });
  }
);

export { contentModalAtom, contentModalOpenAtom };
