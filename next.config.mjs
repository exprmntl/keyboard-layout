/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/dvorak-guide": ["./public/downloads/dvorak-practice-plan.pdf"],
  },
};

export default nextConfig;
