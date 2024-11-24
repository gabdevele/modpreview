export interface ServerItemProps {
    name: string;
    motd: string[] | string | null;
    playerCount: number | null;
    maxPlayers: number | null;
    icon: string | null;
}