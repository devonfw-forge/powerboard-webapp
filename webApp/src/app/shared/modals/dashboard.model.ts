import { ClientStatus } from './clientStatus.model';
import { CodeQuality } from './codeQuatity.model';
import { TeamSpirit } from './teamSpirit.model';

export class Dashboard{
        teamId: number;
        teamName: string;
        codeQualityDTO: CodeQuality[];
        clientStatusDTO: ClientStatus[];
        teamSpiritDTO: TeamSpirit[];
}