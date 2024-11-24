import axios from 'axios';
import { ServerItemProps } from '../types/ServerItemProps';

const SEARCH_URL = 'http://localhost:5000/search?cracked=true&name=';
const STATUS_URL = 'https://api.mcstatus.io/v2/status/java/';
const DEFAULT_SERVER_DETAILS: ServerItemProps = {
  name: '',
  motd: null,
  playerCount: null,
  maxPlayers: null,
  icon: null,
};

const cache: { [key: string]: ServerItemProps[] } = {};

const fetchServerDetails = async (server: { name: string; address: string }): Promise<ServerItemProps> => {
  try {
    const { data: serverDetails } = await axios.get(`${STATUS_URL}${server.address}`);
    if (!serverDetails.online) {
      return { ...DEFAULT_SERVER_DETAILS, name: server.name };
    }
    return {
      name: server.name,
      motd: serverDetails.motd.html,
      playerCount: serverDetails.players.online,
      maxPlayers: serverDetails.players.max,
      icon: serverDetails.icon,
    };
  } catch (error) {
    console.error(`error fetching details for server ${server.address}:`, error);
    return { ...DEFAULT_SERVER_DETAILS, name: server.name };
  }
};

async function* fetchServers(query: string): AsyncGenerator<ServerItemProps, void, unknown> {
  if (!query) return;

  if (cache[query]) {
    for (const server of cache[query]) {
      yield server;
    }
    return;
  }

  try {
    const { data: searchResults } = await axios.get(`${SEARCH_URL}${query}`);
    const fetchedServers: ServerItemProps[] = [];
    const fetchPromises = searchResults.map((server: { name: string; address: string }) =>
      fetchServerDetails(server)
    );

    let timeoutReached = false;
    const timeout = setTimeout(() => {
      timeoutReached = true;
    }, 3000);
    for (const fetchPromise of fetchPromises) {
      const result = await Promise.race([fetchPromise, new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000))]);
      if (result !== null) {
        fetchedServers.push(result);
        yield result;
      }
      if (timeoutReached) {
        break;
      }
    }
    clearTimeout(timeout);
    for (const fetchPromise of fetchPromises) {
      const result = await fetchPromise;
      fetchedServers.push(result);
      yield result;
    }
    cache[query] = fetchedServers;
  } catch (error) {
    console.error(`error fetching servers for query ${query}:`, error);
    throw error;
  }
}

export default fetchServers;