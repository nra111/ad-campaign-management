export class Constants {
  public static readonly DobTimeFormat = 'YYYY-MM-DD';

  public static Pagination = {
    limit: 10,
    pageNo: 1,
  };

  public static readonly StatusCode = {
    SUCCESS_CODE: 200,
    ERROR_CODE: 400,
  };

  public static readonly ResponseMessages = {
    SUCCESS: 'Success',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',    
    CAMPAIGN_CREATE_SUCCESS: 'Campaign Create Suncessfully.',
    CAMPAIGN_UPDATE_SUCCESS: 'Campaign Update Suncessfully.',
    CAMPAIGN_ALREADY_EXIST: 'Campaign already exist.',
    CAMPAIGN_DELETE_SUCCESS: 'Campaign Deleted Successfully',
  };

}

export enum SortType {
  asc = 'ASC',
  desc = 'DESC',
}

export enum SortTypeMongo {
  asc = 1,
  desc = -1,
}
