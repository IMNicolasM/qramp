import moment from 'moment';
import store from '../store/filters.store';
import { cache } from 'src/plugins/utils';
import modalScheduleStore from '../store/modalSchedule.store'
import scheduleTypeModel from '../models/scheduleType.model';

export default async function setUrlParams(proxy: any): Promise<void>{
    try {
      const DATE_FORMAT = 'YYYY/MM/DD'
      const selectedDate = moment(store.selectedDate, DATE_FORMAT);
      const query = store.payload;
      query.type = store.scheduleType;

      const isWeek = store.scheduleType == scheduleTypeModel[0].value
      if(isWeek){
        query.dateStart = selectedDate.startOf("week").format('YYYYMMDD');
        query.dateEnd = selectedDate.endOf("week").format('YYYYMMDD');
      } else {
        query.dateStart = selectedDate.format('YYYYMMDD');
      }

      modalScheduleStore.stationId = query.stationId;
      if (store.form.stationId) cache.set("stationId", store.form.stationId);
      proxy.$router.push({
        name: proxy.$route.name,
        query
      }).catch((error) => {
        if(error.name != ('NavigationDuplicated')) console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
