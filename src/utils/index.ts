import Fuse from "fuse.js";

export const fuzzySearch = <T>({
  list,
  searhKeys,
  searchTerm,
  threshold = 0.5,
}: {
  list: T[];
  searhKeys: (keyof T)[];
  searchTerm: string;
  threshold?: number;
}) => {
  const fuse = new Fuse(list, {
    keys: searhKeys as Fuse.FuseOptionKey[],
    threshold: threshold,
  });
  return fuse.search(searchTerm).map((result) => result.item);
};

export function debounce(func: (this: any, ...args: any[]) => void, wait = 100) {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);
}

export function generateLogoSrc(manufacturerId: string, width = 200): string {
  return `http://images.repzio.com/productimages/${manufacturerId}/logo${manufacturerId}_lg.jpg?width=${width}`;
}

export function optimizeProductImageSrc(
  src: string,
  {
    smImageSize = 400,
    mdImageSize = 600,
    lgImageSize = 800,
  }: {
    smImageSize?: number;
    mdImageSize?: number;
    lgImageSize?: number;
  } = {},
): {
  baseSrc: string;
  srcset: string;
} {
  return {
    baseSrc: `${src}?width=${smImageSize}&height=${smImageSize}`,
    srcset: `
    ${src}?width=${smImageSize}&height=${smImageSize} 1x,
    ${src}?width=${mdImageSize}&height=${mdImageSize} 2x,
    ${src}?width=${lgImageSize}&height=${lgImageSize} 3x
    `,
  };
}

export function pluralize(word: string, quantity: number): string {
  if (quantity === 1) {
    return word;
  }
  return `${word}s`;
}
