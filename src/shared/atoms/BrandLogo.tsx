interface BrandLogoProps {
  readonly src: string;
  readonly alt?: string;
  readonly width?: number;
  readonly height?: number;
}

export const BrandLogo = ({ src, alt = 'INDATTA', width = 181, height = 38 }: BrandLogoProps) => (
  <img src={src} alt={alt} width={width} height={height} />
);
