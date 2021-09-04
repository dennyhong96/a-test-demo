export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);
}

export function generateLogoSrc(manufacturerId: string, width = 100): string {
  return `http://images.repzio.com/productimages/${manufacturerId}/logo${manufacturerId}_lg.jpg?width=${width}`;
}

export function optimizeProductImageSrc(
  src: string,
  {
    smImageSize = 200,
    mdImageSize = 400,
    lgImageSize = 600,
  }: {
    smImageSize?: number;
    mdImageSize?: number;
    lgImageSize?: number;
  } = {}
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
