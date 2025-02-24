/** @type {import('next').NextConfig} */
const nextConfig = {

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
    images: {
         unoptimized: true ,
        domains: [
          "admin.ever4uproperties.com",
          "realeastetbucket.s3.eu-north-1.amazonaws.com"
        ],
      },
  
    // trailingSlash: true,
    // // output: "export", 
    // images: { unoptimized: true },
}

export default nextConfig;
