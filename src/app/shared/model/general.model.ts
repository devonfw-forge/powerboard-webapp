export class PowerboardResponse{
  team_id: string;
  team_name: string;
  project_key: string;
  center: string;
  team_code: string;
  logo: string;
  dashboard: Dashboard = new Dashboard();
  images? : ImageResponse[];
  teamLinks: LinkResponse[];
  aggregationLinks?: AggregationLinkResponse[];
  privileges : string[];
  videos? : VideoResponse[];
  multimedia : MultimediaFolderResponse;
  isTeamConfigured : boolean;
}

export class TeamDetailResponse{
   powerboardResponse : PowerboardResponse = new PowerboardResponse(); 
 
 
}

export class Dashboard{
  teamId:string;
  teamStatus:number;
  sprintWorkUnit: string;
  codeQuality:CodeQualityResponse = new CodeQualityResponse();
  clientStatus:ClientStatusResponse = new ClientStatusResponse();
  teamSpirit:TeamSpiritResponse = new TeamSpiritResponse();
  burndown:BurndownResponse = new BurndownResponse();
  sprintDetail:SprintDetailResponse = new SprintDetailResponse();
  velocity:VelocityResponse = new VelocityResponse();
}
export class CodeQualityResponse{
  bugs:number;
  codeSmells: number;
  codeCoverage:number
  status: string;
}
export class ClientStatusResponse{
  clientSatisfactionRating: number;
  sprintNumber: number;
}
export class TeamSpiritResponse{
  teamSpiritRating: number;
  sprintNumber: number;
}
export class BurndownResponse{
  workUnit: string;
  remainingDays: number;
  remainingWork: number;
  count: number;
  burndownStatus: string;
  updatedAt? : Date;
}
export class SprintDetailResponse{
  Sprint_current_day: number;
  sprint_number: number;
  Sprint_days: number;
}
export class VelocityResponse{
  Avg: number;
  Committed: number;
  Completed: number;
  updatedAt? : Date;
}

export class LinkResponse{
  teamLinkId: string;
  linkName: string;
  linkType: string;
  links: string;
}

export class AggregationLinkResponse{
  id?: string;
  url: string;
  startDate: string;
  isActive: boolean;
  aggregationFrequency: number;
  linkType: string;
  teamId: string;
}


export class LinksCategory {
  linkId: string;
  linkTitle: string;
}
export class AggregationLinkType {
  linkId: string;
  linkTitle: string;
}
export class ImageResponse{
  ImageId: string;
  ImagePath: string;
}
export class VideoResponse{
  videoId: string;
  videoPath: string;
}
export class VisibleResponse{
  teamId: string;
  image: boolean;
  video: boolean;
  dailyMeeting: boolean;
  teamLinks: boolean;
}

export class MultimediaFolderResponse{
  display : MultimediaFilesNew[];
  root : RootNew[];
  }
  
  export class MultimediaFilesNew{
      id : string;
      isSelected? : boolean;
      urlName : string;
      isImage? : boolean;
      inSlideShow? : boolean;
  }
  export class RootNew{
      folderId : string;
      folderName : string; 
      status : boolean;
      isSelected? : boolean;
      inSlideShow? : boolean;
  }


  export class SlideshowFiles{
      fileURL : string;
      isImage? : boolean;

  }