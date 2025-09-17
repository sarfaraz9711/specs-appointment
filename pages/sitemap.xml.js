
const EXTERNAL_DATA_URL = `https://backend.redchief.in/api/product/all-active-products`;
const siteUrl = "https://redchief.in"
function generateSiteMap(posts) {
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     
     ${posts && posts.map(( item ) => {
      const lastModDateObj = new Date(item.p_modified_date);
      var lastMod = lastModDateObj.getFullYear() + '-'
             + ('0' + (lastModDateObj.getMonth()+1)).slice(-2) + '-'
             + ('0' + lastModDateObj.getDate()).slice(-2);

        return `
       <url>
           <loc>${`${siteUrl}/product/${item.p_product_slug}`}</loc>
           <lastmod>${lastMod}</lastmod>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();
  //console.log(posts, "Nero Postssss")
  // We generate the XML sitemap with the posts data
  if (posts.status == 200) {
    
    const sitemap = generateSiteMap(posts.data);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  }
}

export default SiteMap;