import React, { useState, useEffect, useRef } from 'react';

//import earth from './assets/link.png';
import ServerItem from './components/ServerItem';
import ButtonsFooter from './components/ButtonsFooter';
//import ImageSquareButton from './components/ImageSquareButton';
import useDebounce from './hooks/Debounce';
import LoadingDots from './components/LoadingDots';
import fetchServers from './utils/fetchServers';
import { ServerItemProps } from './types/ServerItemProps';
import { SelectedServerProvider } from './context/SelectedServerContext';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [servers, setServers] = useState<ServerItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const updateMaxHeight = () => {
      if (containerRef.current) {
        const screenHeight = window.innerHeight;
        containerRef.current.classList.remove('max-h-[75vh]', 'max-h-[70vh]', 'max-h-[65vh]');
  
        if (screenHeight > 795) {
          containerRef.current.classList.add('max-h-[75vh]');
        } else if (screenHeight > 695) {
          containerRef.current.classList.add('max-h-[70vh]');
        } else {
          containerRef.current.classList.add('max-h-[65vh]');
        }
      }
    };
  
    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);
  
    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  useEffect(() => {
    const fetchServerData = async () => {
      if (!debouncedSearchQuery) {
        setServers([]);
        return;
      }
      setIsLoading(true);
      setIsError(false);
      setServers([]);
      const serverNames = new Set();
      try {
        for await (const server of fetchServers(debouncedSearchQuery)) {
          if (!serverNames.has(server.name)) {
            setServers(prevServers => [...prevServers, server]);
            serverNames.add(server.name);
          }
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchServerData();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    console.log('server fetchati:', servers);
  }, [servers]);


  const checkOverflow = () => {
    if (scrollRef.current) {
      setIsOverflowing(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setTimeout(() => {
      if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent)) {
        alert('This website is not optimized for mobile devices. Please use a desktop browser.');
      }
    }, 100);
  }, []);
  return (
    <SelectedServerProvider>
      <div className="flex flex-col items-center w-full justify-between min-h-screen gap-4 relative select-none">
        <div className="flex flex-row gap-4 w-full max-w-lg pt-5 px-2 md:px-0">
          <input
            type="text"
            className="w-full p-2 border-0 outline-0 text-black bg-no-repeat"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {
          //<ImageSquareButton image={earth} onClick={() => {}} />}
          }
        </div>

        <div className="flex w-full grow bg-black/[.4] justify-center border-y-2 border-black max-h-[75vh] "  ref={containerRef}>
          <div className="flex flex-col w-full max-w-2xl pr-2 gap-3 overflow-y-auto py-1" ref={scrollRef}>
          {debouncedSearchQuery.length === 0 && (
            <div className="flex flex-col gap-2 w-full p-2">
              <h2 className="text-white text-2xl">
                Hi! This is a preview of the mod <span className='font-minecraftBold text-yellow-500'>ServerSearch</span>
              </h2>
              <p className="text-gray-300 mt-2">
                With this new mod for <span className="text-green-500">Forge 1.20</span>, you can search for servers without opening a browser. Just type the server name, save, and join!
              </p>
              <p className="text-red-500 mt-2 animate-pulse">
                Note: This website and mod are still in development, so there might be some bugs.
              </p>
              <p className="text-violet-300 mt-4">
                {"Made with <3 by "}<a href="https://github.com/gabdevele" target="_blank" rel="noopener noreferrer" className="underline hover:text-violet-500">@gabdevele</a>
              </p>
            </div>
          )}

            {isError && <p className="text-red-500">Error fetching servers.</p>}
            {servers.map((server: ServerItemProps, index: number) => (
              <ServerItem
                key={index}
                name={server.name}
                motd={server.motd}
                maxPlayers={server.maxPlayers}
                playerCount={server.playerCount}
                icon={server.icon}
                isOverflowing={isOverflowing}
              />
            ))}
            <LoadingDots isLoading={isLoading} />
          </div>
        </div>
        <ButtonsFooter />
      </div>
  </SelectedServerProvider>
  );
};

export default App;