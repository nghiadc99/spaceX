import { ApiHelper } from '../../utils/http';
import { IQueryParam } from '../common';
import { ILaunch } from './launches.interface';

class LaunchesServiceRoute {
	static readonly LAUNCHES = '/launches';
}

export const getLaunches = async (query?: IQueryParam[]) =>
	ApiHelper.get<ILaunch[]>(LaunchesServiceRoute.LAUNCHES, undefined, query);
