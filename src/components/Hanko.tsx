interface HankoProps {
  /** One or two characters to render inside the seal. */
  children: string;
  className?: string;
  /** Diameter in rem-ish sizing via Tailwind size classes. */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl",
};

/** A decorative red seal (hanko) accent containing a glyph. */
export function Hanko({ children, className = "", size = "md" }: HankoProps) {
  return (
    <span
      aria-hidden="true"
      className={
        "inline-flex select-none items-center justify-center rounded-md border-2 border-hanko font-jp font-bold text-hanko " +
        sizeMap[size] +
        " " +
        className
      }
    >
      {children}
    </span>
  );
}
