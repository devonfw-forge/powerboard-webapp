import { BUInfo } from './bu-info.modal';
import { Dashboard } from './dashboard.model';
import { UserBreadCrumb } from './user-breadcrumb.modal';

export class Data {
    dashboard: Dashboard[];
    breadCrumb: UserBreadCrumb[];
    businessUnit: BUInfo[];
}