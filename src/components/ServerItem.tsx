import React, { useMemo } from 'react';
import ping_5 from '../assets/server_list/ping_5.png';
import unreachable from '../assets/server_list/unreachable.png';
import { ServerItemProps } from '../types/ServerItemProps';
import { useSelectedServer } from '../context/SelectedServerContext';

const DEFAULT_ICON_URL = "https://mcutils.com/display/packpng.svg";

const ServerItem: React.FC<{ isOverflowing: boolean } & ServerItemProps> = ({ name, motd, playerCount, maxPlayers, icon, isOverflowing }) => {

  const { selectedServer, setSelectedServer } = useSelectedServer();

  const formattedMotd = useMemo(() => {
    if (motd === null) {
      return "<span class='text-red-700 font-minecraft'>Can't connect to the server.</span>";
    }
    return Array.isArray(motd) ? motd.join('<br />') : motd;
  }, [motd]);

  const handleClick = () => {
    setSelectedServer({ name, motd, playerCount, maxPlayers, icon });
  };

  const isSelected = selectedServer?.name === name;

  return (
    <div
      className={`relative flex flex-row gap-4 w-full items-center cursor-pointer ${isSelected ? 'border-2 border-white' : ''}`}
      onClick={handleClick}
    >
      <img src={icon || DEFAULT_ICON_URL} alt={`${name} icon`} className="w-16 h-16 md:w-[74px] md:h-[74px] aspect-square object-cover" />
      <div className="flex flex-col grow">
        <h3 className="font-minecraft text-lg text-white">{name}</h3>
        <div>
          {isOverflowing ? (
            <span className="text-base font-minecraftBold" dangerouslySetInnerHTML={{ __html: formattedMotd }}></span>
          ) : (
            <pre className="text-base color font-minecraftBold" dangerouslySetInnerHTML={{ __html: formattedMotd }}></pre>
          )}
        </div>
      </div>
      <div className="absolute top-1 right-1 flex flex-row text-right gap-1 items-center">
        <p className="text-gray-400 text-lg font-minecraft">
          {playerCount !== null && playerCount}
          {maxPlayers && `/${maxPlayers}`}
        </p>
        <img src={playerCount !== null ? ping_5 : unreachable} alt="ping" className='w-4 h-3 object-cover'/>
      </div>
    </div>
  );
};

export default ServerItem;