// netlify/functions/tle-proxy.js
export async function handler(event, context) {
  const group = event.queryStringParameters.group || "stations";
  const url = `https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=tle`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Error fetching TLE: ${err.message}`,
    };
  }
}
