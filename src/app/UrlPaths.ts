export class UrlPathConstants{

     

    public static loginEndPoint =  "auth/login";

    public static resetPasswordEndPonit = "auth/change-password";

    public static guestLoginEndPoint = "auth/login/guest";
    
    public static guestUserName = "guest";
    
    public static guestPassword ="guest";



    public static getTeamDetailsEndPoint = "teams/powerboard/team";

    public static getTeamsCenterEndPoint = "teams/center/";



    public static getProjectDetailsEndpoint = "auth/home/";

    public static lastLoggedEndPoint = "user/team/loggedProject";



    public static FilesFromFolderEndpoint = "multimedia/getAllFilesInFolder/";

    public static FilesForTeamEndpoint = "multimedia/getAllFilesForTeam/";

    public static getSlideshowFilesEndpoint = "multimedia/slideshow/";



    public static addTeamEndPoint = "teams/team/addTeam";

    public static deleteTeamEndPoint = "teams/team/delete/";

    public static viewAllTeamsEndPoint = "teams/team/viewAllTeams";



    public static addTeamMemberEndPoint = "auth/register";

    public static viewAllMembersOfTeamEndPoint = "user/viewAllMemberOfTeam/";

    public static deleteTeamMemberEndPoint = "user/delete/userTeam/";



    public static updateUserRoleEndPoint = "user/update/userRole";

    public static uploadLogoEndPoint = "teams/uploadLogo/";

    public static deleteLogoEndPoint = "teams/deleteLogo/";

    public static updateTeamConfigurationEndPoint = "teams/teamConfigured/";

    public static updateTeamEndPoint = "teams/team/update/";

    public static deleteLinkEndPoint = "team-links/delete/";

    public static getLinksCategoryEndPoint = "team-links/getLinksCategory";

    public static addLinkEndPoint = "team-links/teamId/create";

    public static uploadFileEndPoint = "multimedia/uploadFile/";

    public static addFolderEndPoint = "multimedia/addFolder/";

    public static uploadFileToFolderEndPoint = "multimedia/uploadFileToFolder/";

    public static deleteFilesAndFoldersEndPoint = "multimedia/deleteFilesAndFolders/";

    public static addToSlideshowEndPoint = "multimedia/addToSlideshow/";

    public static viewAllUserRolesEndPoint = "user/viewAllUserRoles";

    public static slideshowInterval = 3000;

    public static uploadXLSXEndPoint = "teams/uploadXLSXFile/";

    public static uploadJSONFileEndPoint = "teams/uploadJSONFile/";

    public static uploadClientRatingEndPoint = "teams/updateClientRating/";

    public static getAggregationLinksCategoryEndPoint = "team-links/getAggregationLinksCategory";

    public static deleteAggregationLinkEndPoint = "team-links/deleteAggregationLink/";

    public static addAggregationLinkEndPoint = "team-links/aggregationLink/create";

    public static jiraLinkCategoryTitle ="jira";

    public static canUploadCientRatingEndPoint = "teams/dataUpload/canUploadClientRating/"
}