import { apiGet, apiPost } from './request';
const TEMPLATE_OUTPUT_PATH = 'https://raw.githubusercontent.com/subquery/templates/main/dist/dictionary.json'

// This code validates the health of endpoints in dictionary.json file

async function checkHealth(): Promise<void> {
  try {
    // Fetch JSON data from the provided URL
    const data = await apiGet(TEMPLATE_OUTPUT_PATH);

    // Iterate through the data and check if it matches the GraphQL query
    for (const network in data) {
      const networks = data[network];
      for (const networkId in networks) {
        const urls = networks[networkId];

        // Check if urls is an array before iterating
        if (Array.isArray(urls)) {
          for (const url of urls) {
            try {
              // Assuming you have a GraphQL endpoint to send queries
              const graphqlData = await apiPost(url, {
                query: `query {
                  _metadata {
                      startHeight,
                      lastProcessedHeight,
                  }
              }`})

              if (graphqlData.error || graphqlData.errors) {
                console.log(`- Network ${network} (${networkId}) at URL ${url}, Error: ${JSON.stringify(graphqlData.error || graphqlData.errors)}`);
              } else {
                // Check if the response matches the health condition
                const metadata = graphqlData.data?._metadata;
                if (metadata && metadata.startHeight !== undefined && metadata.lastProcessedHeight !== undefined) {
                  // Enable this comment to include healthy networks
                  // console.log(`Network ${network} (${networkId}) at URL ${url} is healthy.`);
                } else {
                  console.log(`- Network ${network} (${networkId}) at URL ${url} is not healthy, missing metadata.`);
                }
              }
            } catch (graphqlError) {
              console.error(`Error fetching GraphQL data for Network ${network} (${networkId}) at URL ${url}:`, graphqlError);
            }
          }
        } else {
          console.log(`Invalid data format for network ${network} (${networkId}).`);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkHealth();