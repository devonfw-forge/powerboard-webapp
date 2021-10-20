import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse, LinksCategory } from 'src/app/shared/model/general.model';
import { environment } from '../../../environments/environment';
import {
  ConfigureTeamSpirit,
  DailyMeetingLinksDetails,
  TeamLinksDetails,
  UpdateTeam,
} from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  constructor(private http: HttpClient) {}

  async addFilesToTeam(teamId, file: File): Promise<any> {
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
      .post<any>(
        environment.restPathRoot + 'v1/multimedia/uploadFile/' + teamId,
        formData
      )
      .toPromise();
  }

  async addVideosToTeam(teamId, file: File): Promise<any> {
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
      .post<any>(
        environment.restPathRoot + 'v1/videos/uploadVideo/' + teamId,
        formData
      )
      .toPromise();
  }

  async addLogoToTeam(teamId, file: File): Promise<any> {
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
      .post<any>(
        environment.restPathRoot + 'v1/teams/uploadLogo/' + teamId,
        formData
      )
      .toPromise();
  }

  async deleteLogo(teamId: string): Promise<any> {
    return await this.http
      .delete<any>(environment.restPathRoot + 'v1/teams/deleteLogo/' + teamId)
      .toPromise();
  }

  async sendDetailsTeamSpirit(
    teamSpiritDetails: ConfigureTeamSpirit
  ): Promise<any> {
    return await this.http
      .put<any>(
        environment.restPathRoot + 'v1/team-spirit/updateTeam/' +
          teamSpiritDetails.Name,
        teamSpiritDetails
      )
      .toPromise();
  }

  async updateTeam(formData: UpdateTeam): Promise<any> {
    return await this.http
      .put<any>(environment.restPathRoot + 'v1/teams/team/update/', formData)
      .toPromise();
  }

  async deleteLink(teamLinkId: string): Promise<any> {
    return await this.http
      .delete<any>(environment.restPathRoot + 'v1/team-links/delete/' + teamLinkId)
      .toPromise();
  }

  async getLinkTypes(): Promise<any> {
    return await this.http
      .get<any>(environment.restPathRoot + 'v1/team-links/getLinksCategory')
      .toPromise();
  }

  async deleteFile(teamId: string, imageId: string): Promise<LinksCategory[]> {
    return await this.http
      .delete<LinksCategory[]>(
        environment.restPathRoot + 'v1/multimedia/deleteFile/' +
          teamId +
          '/' +
          imageId
      )
      .toPromise();
  }

  async deleteVideos(videoId: string): Promise<any> {
    return await this.http
      .delete<any>(environment.restPathRoot + 'v1/videos/delete/' + videoId)
      .toPromise();
  }

  async addLink(addLinkForm: LinksCategory) {
    return await this.http
      .post(environment.restPathRoot + 'v1/team-links/teamId/create', addLinkForm)
      .toPromise();
  }
}
