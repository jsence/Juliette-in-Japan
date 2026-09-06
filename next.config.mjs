import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      // Kana Battle moved out of the Language section into Games. Without this
      // the old path would fall through to /language/kana/[char] and 404.
      { source: "/language/kana/game", destination: "/games/kana-battle", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
