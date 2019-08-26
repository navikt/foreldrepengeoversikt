import * as moment from 'moment';
import { AxiosTransformer } from 'axios';

const dateStringToMomentMapper = (response: any, headers?: any): AxiosTransformer => {
    if(response === undefined) {
        
    }
    return JSON.parse(response, (key: string, value: unknown) => {
        const parsedValue =
            typeof value === "string" ? moment(value, [moment.HTML5_FMT.DATE, moment.ISO_8601]) : undefined;

        return parsedValue && parsedValue.isValid() ? parsedValue : value;
    });
};
export default dateStringToMomentMapper;
