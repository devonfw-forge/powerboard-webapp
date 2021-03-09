import { BurnDown } from './burnDown.modal';
import { ClientStatus } from './clientStatus.model';
import { CodeQuality } from './codeQuatity.model';
import { TeamSpirit } from './teamSpirit.model';
import { Velocity } from './Velocity.modal';

export class Dashboard{
        teamId: number;
        teamName: string;
        codeQualityDTO: CodeQuality;
        clientStatusDTO: ClientStatus;
        teamSpiritDTO: TeamSpirit;
        velocityDTO: Velocity;
        burndownDTO: BurnDown;
}