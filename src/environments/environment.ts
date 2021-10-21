// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  multimediaPrefix : "https://powerboard-test.s3.eu-central-1.amazonaws.com/uploads/uploads/multimedia/",
  logoPrefix : "https://powerboard-test.s3.eu-central-1.amazonaws.com/uploads/uploads/logo/",
  localPrefix : "assets/uploads/multimedia/",

  globalEndPoint : "http://localhost:3001/v1/",
  loginEndPoint :  "auth/login",
  resetPasswordEndPonit : "auth/change-password",
  guestLoginEndPoint : "auth/login/guest",


  getTeamDetailsEndPoint : "teams/powerboard/team",
  getTeamsCenterEndPoint : "teams/center/",

  getProjectDetailsEndpoint : "auth/home/",
  lastLoggedEndPoint : "user/team/loggedProject",

  FilesFromFolderEndpoint : "multimedia/getAllFilesInFolder/",
  FilesForTeamEndpoint : "multimedia/getAllFilesForTeam/",
  getSlideshowFilesEndpoint : "multimedia/slideshow/",

  addTeamEndPoint : "teams/team/addTeam",
deleteTeamEndPoint : "teams/team/delete/",
viewAllTeamsEndPoint : "teams/team/viewAllTeams",

addTeamMemberEndPoint : "auth/register",
viewAllMembersOfTeamEndPoint : "user/viewAllMemberOfTeam/",
deleteTeamMemberEndPoint : "user/delete/userTeam/",

updateUserRoleEndPoint : "user/update/userRole",
uploadLogoEndPoint : "teams/uploadLogo/",
deleteLogoEndPoint : "teams/deleteLogo/",

updateTeamEndPoint : "teams/team/update/",
deleteLinkEndPoint : "team-links/delete/",
getLinksCategoryEndPoint : "team-links/getLinksCategory",
addLinkEndPoint : "team-links/teamId/create",
uploadFileEndPoint : "multimedia/uploadFile/",
addFolderEndPoint : "multimedia/addFolder/",
uploadFileToFolderEndPoint : "multimedia/uploadFileToFolder/",
deleteFilesAndFoldersEndPoint : "multimedia/deleteFilesAndFolders/",
addToSlideshowEndPoint : "multimedia/addToSlideshow/",
viewAllUserRolesEndPoint : "user/viewAllUserRoles",
  slideshowInterval: 3000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
