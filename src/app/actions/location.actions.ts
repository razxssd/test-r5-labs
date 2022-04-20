export async function fetchLocations<T>(): Promise<{response?: T, error?: any}> {
  const response = await fetch('http://localhost:3001/get-locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"start":12,"limit":10})
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    return {error: message};
  }
  const res = await response.json();
  return {response: res};
}
